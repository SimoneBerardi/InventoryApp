import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Item, ItemCategory } from './item.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { CharacterProvider } from '../characters/character.provider';
import { ItemGroup } from './item-group.model';
import { MemoryProvider } from '../shared/memory-provider.model';

@Injectable()
export class ItemProvider extends MemoryProvider<Item> {
  private _groups: ItemGroup[];

  constructor(
    _events: Events,
    _utility: UtilityProvider,
    _storage: StorageProvider,
  ) {
    super(
      _events,
      _utility,
      Item,
      _storage,
      "inventoryApp_items",
    );

    this._testItems = [
      {
        id: 1,
        characterId: 1,
        name: "arma 1",
        description: "descrizione arma 1",
        weight: 2,
        category: 0,
      },
      {
        id: 2,
        characterId: 1,
        name: "arma 2",
        description: "descrizione arma 2",
        weight: 2.5,
        category: 0,
      },
      {
        id: 3,
        characterId: 1,
        name: "armatura 1",
        description: "descrizione armatura 1",
        weight: 5,
        category: 1,
      },
      {
        id: 4,
        characterId: 1,
        name: "armatura 2",
        description: "descrizione armatura 2",
        weight: 20,
        category: 1,
      },
      {
        id: 5,
        characterId: 1,
        name: "oggetto 1",
        description: "descrizione oggetto 1",
        weight: 1.5,
        category: 2,
      },
      {
        id: 6,
        characterId: 1,
        name: "oggetto 2",
        description: "descrizione oggetto 2",
        weight: 0.5,
        category: 2,
      },
    ];

    this._events.subscribe("Character:load", id => {
      this._loadByCharacterId(id);
    });
    this._events.subscribe("Character:delete", id => {
      this._deleteByCharacterId(id);
    });
  }

  addToInventory(item: Item, quantity: number) {
    this._publishEvent("addInventory", {
      item: item,
      quantity: quantity,
      isNegative: false
    });
  }
  removeFromInventory(item: Item, quantity: number) {
    this._publishEvent("removeInventory", {
      item: item,
      quantity: quantity,
      isNegative: true
    });
  }

  getFromSession() {
    return this._getByCharacterId(this._utility.session.loadedCharacterId);
  }
  getGroupedByCategory() {
    return Promise.resolve(this._groups);
  }
  getBySearch(value: string) {
    return this.getFromSession().then(items => {
      return Promise.resolve(items.filter(item => {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      }));
    });
  }

  //-- override --
  add(item: Item) {
    item.characterId = this._utility.session.loadedCharacterId;
    return super.add(item);
  }
  modify(id: number, newItem: Item) {
    return this.getById(id).then(item => {
      newItem.totalQuantity = item.totalQuantity;
      return super.modify(id, newItem);
    });
  }
  load() {
    this._loadGroups();
    return super.load();
  }

  private _deleteByCharacterId(characterId: number) {
    return this.filter(item => item.characterId === characterId).then(items => {
      return items.delete();
    });
  }
  private _loadByCharacterId(characterId: number) {
    return this._getByCharacterId(characterId).then(items => {
      this._groups.forEach(group => {
        group.items = items.filter(item => item.category === group.category)
      });
      return Promise.resolve();
    });
  }
  private _getByCharacterId(characterId: number) {
    return this.filter(item => item.characterId === characterId);
  }
  private _loadGroups() {
    this._groups = [];
    this._utility.enumerateEnum(ItemCategory).forEach(category => {
      let group = new ItemGroup();
      group.category = category.key;
      group.name = category.value;
      this._groups.push(group);
    });
    this._events.subscribe("Item:add", id => {
      this.getById(id).then(item => {
        let group = this._groups.find(group => group.category === item.category);
        group.items.push(item);
      });
    });
    this._events.subscribe("Item:modify", id => {
      this.getById(id).then(item => {
        let oldItem: Item = null;
        let oldGroup: ItemGroup = null;
        this._groups.some(group => {
          oldGroup = group;
          oldItem = group.items.find(groupItem => groupItem.id === item.id);
          return oldItem != null;
        });
        let group = this._groups.find(group => group.category === item.category);
        if (oldGroup.category !== group.category) {
          oldGroup.items.splice(oldGroup.items.indexOf(oldItem), 1);
          group.items.push(item);
        }
      })
    });
    this._events.subscribe("Item:delete", id => {
      this.getById(id).then(item => {
        let group = this._groups.find(group => group.category === item.category);
        group.items.splice(group.items.indexOf(item), 1);
      });
    })
  }
}

export interface ItemInventoryAction {
  item: Item;
  quantity: number;
  isNegative: boolean;
}
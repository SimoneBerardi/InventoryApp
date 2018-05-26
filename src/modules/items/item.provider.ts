import { Injectable, EventEmitter } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Item, ItemCategory } from './item.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { DataProvider } from '../shared/data-provider.model';
import { CharacterProvider } from '../characters/character.provider';
import { Events } from 'ionic-angular';
import { ItemGroup } from './item-group.model';

@Injectable()
export class ItemProvider extends DataProvider<Item> {
  private _items: Item[] = [];
  private _groups: ItemGroup[] = [];

  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
    private _events: Events,
  ) {
    super(
      _storage,
      _utility,
      "inventoryApp_items",
      Item,
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

    this._events.subscribe("character:load", id => {
      this.selectFromSession();
    });
    this._events.subscribe("character:delete", id => {
      this.deleteByCharacterId(id);
    });
  }

  addItem(data: ItemAddiction) {
    this._events.publish("item:add", data);
  }

  selectBySearch(value: string) {
    return this.selectFromSession().then(items => {
      return Promise.resolve(items.filter(item => {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      }));
    })
  }

  selectByGroup() {
    return Promise.resolve().then(() => {
      if (this._groups.length == 0 || this._groups[0].items[0].characterId !== this._utility.session.loadedCharacterId)
        return this._selectByGroup();
      else
        return Promise.resolve(null);
    }).then(groups => {
      if (groups !== null)
        this._groups = groups;
      return Promise.resolve(this._groups);
    });
  }

  selectFromSession() {
    return Promise.resolve().then(() => {
      if (this._items.length == 0 || this._items[0].characterId !== this._utility.session.loadedCharacterId)
        return this.selectByCharacterId(this._utility.session.loadedCharacterId);
      else
        return Promise.resolve(null);
    }).then(items => {
      if (items !== null)
        this._items = items;
      return Promise.resolve(this._items);
    });
  }

  selectByCharacterId(characterId: number) {
    return Promise.resolve(this.list.filter(item => item.characterId === characterId));
  }

  deleteByCharacterId(characterId: number) {
    this.list = this.list.filter(item => item.characterId !== characterId);
    return this.save();
  }

  delete(id: number) {
    return this.select(id).then(item => {
      this._items.splice(this._items.indexOf(item), 1);
      let group = this._groups.find(group => group.category === item.category);
      if (group)
        group.items.splice(group.items.indexOf(item), 1);
      return super.delete(id);
    }).then(() => {
      this._events.publish("item:delete", id);
      return Promise.resolve();
    })
  }

  insert(item: Item) {
    item.characterId = this._utility.session.loadedCharacterId;
    this._items.push(item);
    let group = this._groups.find(group => group.category === item.category);
    if (group)
      group.items.push(item);
    return super.insert(item);
  }

  private _selectByGroup() {
    return this.selectFromSession().then(items => {
      let groups: ItemGroup[] = [];
      this._utility.enumerateEnum(ItemCategory).forEach(category => {
        let group = new ItemGroup();
        group.category = category.key;
        group.name = category.value;
        group.items = items.filter(item => item.category === category.key)

        let oldGroup = this._groups.find(o => o.name === group.name);
        if (oldGroup)
          group.isOpen = oldGroup.isOpen;
        if (group.items.length > 0)
          groups.push(group);
      });
      return Promise.resolve(groups);
    });
  }
}

export interface ItemAddiction {
  id: number;
  quantity?: number;
}
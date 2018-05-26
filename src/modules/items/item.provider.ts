import { Injectable, EventEmitter } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Item } from './item.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { DataProvider } from '../shared/data-provider.model';
import { CharacterProvider } from '../characters/character.provider';
import { Events } from 'ionic-angular';

@Injectable()
export class ItemProvider extends DataProvider<Item> {
  items: Item[] = [];

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

  selectFromSession() {
    return Promise.resolve().then(() => {
      if (this.items.length == 0 || this.items[0].characterId !== this._utility.session.loadedCharacterId)
        return this._loadByCharacterId(this._utility.session.loadedCharacterId);
      else
        return Promise.resolve(null);
    }).then(items => {
      if (items !== null)
        this.items = items;
      return Promise.resolve(this.items);
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
    return super.delete(id).then(() => {
      this._events.publish("item:delete", id);
      return Promise.resolve();
    });
  }

  insert(item: Item) {
    item.characterId = this._utility.session.loadedCharacterId;
    return super.insert(item);
  }

  private _loadByCharacterId(characterId: number) {
    return this.selectByCharacterId(characterId);
  }
}

export interface ItemAddiction {
  id: number;
  quantity?: number;
}
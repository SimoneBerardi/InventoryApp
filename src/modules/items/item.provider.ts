import { Injectable } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Item } from './item.model';
import { UtilityProvider } from '../shared/providers/utility.provider';

@Injectable()
export class ItemProvider {
  private _itemsKey: string = "inventoryApp_items";

  items: Item[] = [];

  constructor(
    private _storage: StorageProvider,
    private _utility: UtilityProvider,
  ) { }

  select(id: number) {
    return this.items.find(o => o.id === id);
  }

  update(id: number, newItem: Item) {
    let item = this.select(id);
    if (!item)
      throw new Error("Personaggio non trovato");

    newItem.id = item.id;
    Object.assign(item, newItem);
    return this.save();
  }

  insert(item: Item) {
    item.id = this._utility.generateListId(this.items);
    this.items.push(item);
    return this.save();
  }

  delete(id: number) {
    let item = this.select(id);
    if (!item)
      throw new Error("Personaggio non trovato");

    this.items.splice(this.items.indexOf(item), 1);
    return this.save();
  }

  clear() {
    this.items = new Array<Item>();
    return this._storage.remove(this._itemsKey);
  }

  load() {
    return this._storage.deserialize<Item>(this._itemsKey, Item).then(items => {
      if (items)
        this.items = items as Item[];
      return Promise.resolve();
    });
  }

  save() {
    return this._storage.serialize(this._itemsKey, this.items);
  }

  loadTestItems() {
    let items = [
      {
        id: 1,
        name: "arma 1",
        description: "descrizione arma 1",
        weight: 2,
        category: 0,
      },
      {
        id: 2,
        name: "arma 2",
        description: "descrizione arma 2",
        weight: 2.5,
        category: 0,
      },
      {
        id: 3,
        name: "armatura 1",
        description: "descrizione armatura 1",
        weight: 5,
        category: 1,
      },
      {
        id: 4,
        name: "armatura 2",
        description: "descrizione armatura 2",
        weight: 20,
        category: 1,
      },
      {
        id: 5,
        name: "oggetto 1",
        description: "descrizione oggetto 1",
        weight: 1.5,
        category: 2,
      },
      {
        id: 6,
        name: "oggetto 2",
        description: "descrizione oggetto 2",
        weight: 0.5,
        category: 2,
      },
    ];
    items.forEach(item => {
      let newItem = new Item();
      Object.assign(newItem, item);
      this.items.push(newItem);
    });
  }
}
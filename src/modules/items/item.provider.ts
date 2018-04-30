import { Injectable } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Item } from './item.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { DataProvider } from '../shared/data-provider.model';

@Injectable()
export class ItemProvider extends DataProvider<Item> {
  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
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
  }
}
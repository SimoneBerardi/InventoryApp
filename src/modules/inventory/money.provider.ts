import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Money } from './model/money.model';
import { BagItem } from './model/bag-item.model';
import { Bag } from './model/bag.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { Inventory } from './model/inventory.model';
import { Data } from '../shared/data.model';
import { MemoryProvider } from '../shared/memory-provider.model';

@Injectable()
export class MoneyProvider extends MemoryProvider<Money>{
  constructor(
    _events: Events,
    _utility: UtilityProvider,
    _storage: StorageProvider,
  ) {
    super(
      _events,
      _utility,
      Money,
      _storage,
      "inventoryApp_money",
    );

    this._testItems = [
      {
        id: 1,
        inventoryId: 1,
        copper: 50,
        silver: 100,
        electrum: 0,
        gold: 12,
        platinum: 0,
      },
      {
        id: 2,
        inventoryId: 2,
        copper: 500,
        silver: 10,
        electrum: 12,
        gold: 120,
        platinum: 52,
      }
    ];
  }

  getByInventoryId(inventoryId: number) {
    return this.find(money => money.inventoryId === inventoryId);
  }
  deleteByInventoryId(inventoryId: number) {
    return this.find(money => money.inventoryId === inventoryId).then(money => {
      return money.delete();
    });
  }
}
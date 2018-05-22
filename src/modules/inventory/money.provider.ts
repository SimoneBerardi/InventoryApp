import { Injectable } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Money } from './model/money.model';
import { BagItem } from './model/bag-item.model';
import { Bag } from './model/bag.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { Inventory } from './model/inventory.model';
import { Jsonable } from '../shared/jsonable.model';
import { DataProvider } from '../shared/data-provider.model';

@Injectable()
export class MoneyProvider extends DataProvider<Money>{
  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
  ) {
    super(
      _storage,
      _utility,
      "inventoryApp_money",
      Money,
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

  selectByInventoryId(inventoryId: number) {
    return this.list.find(money => money.inventoryId === inventoryId);
  }

  deleteByInventoryId(inventoryId: number) {
    this.list = this.list.filter(bagItem => bagItem.inventoryId !== inventoryId);
    return this.save();
  }
}
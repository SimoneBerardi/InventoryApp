import { Injectable } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { DataProvider } from '../shared/data-provider.model';
import { BagItem } from './model/bag-item.model';

@Injectable()
export class BagItemProvider extends DataProvider<BagItem>{
  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
  ) {
    super(
      _storage,
      _utility,
      "inventoryApp_bagItems",
      BagItem,
    );

    let itemsCount = 5;
    let bagsCount = 5;
    let bagItemId = 0;

    for (let i = 0; i < bagsCount; i++) {
      for (let j = 0; j < itemsCount; j++) {
        this._testItems.push({
          id: bagItemId,
          inventoryId: 1,
          bagId: i,
          itemId: j + 1,
          quantity: j + 1,
        });
        bagItemId++;
      }
    }
  }

  selectByInventoryId(inventoryId: number) {
    return Promise.resolve(this._list.filter(bagItem => bagItem.inventoryId === inventoryId));
  }

  deleteByBagId(bagId: number) {
    this._list = this._list.filter(bagItem => bagItem.bagId !== bagId);
    return this.save();
  }

  deleteByInventoryId(inventoryId: number) {
    this._list = this._list.filter(bagItem => bagItem.inventoryId !== inventoryId);
    return this.save();
  }

  deleteByItemId(inventoryId: number, itemId: number) {
    this._list = this._list.filter(bagItem => bagItem.itemId !== itemId);
    return this.save();
  }

  selectByInventoryIdItemId(inventoryId: number, itemId: number) {
    return Promise.resolve(this._list.filter(bagItem => bagItem.itemId === itemId));
  }
}
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { StorageProvider } from '../shared/providers/storage.provider';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { BagItem } from './model/bag-item.model';
import { MemoryProvider } from '../shared/memory-provider.model';

@Injectable()
export class BagItemProvider extends MemoryProvider<BagItem>{
  constructor(
    _events: Events,
    _utility: UtilityProvider,
    _storage: StorageProvider,
  ) {
    super(
      _events,
      _utility,
      BagItem,
      _storage,
      "inventoryApp_bagItems",
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

  getByInventoryId(inventoryId: number) {
    return this.filter(bagItem => bagItem.inventoryId === inventoryId)
  }
  getByInventoryIdItemId(inventoryId: number, itemId: number) {
    return this.filter(bagItem => bagItem.itemId === itemId);
  }
  deleteByBagId(bagId: number) {
    return this.filter(bagItem => bagItem.bagId === bagId).then(bagItems => {
      return bagItems.delete();
    });
  }
  deleteByInventoryId(inventoryId: number) {
    return this.filter(bagItem => bagItem.inventoryId === inventoryId).then(bagItems => {
      return bagItems.delete();
    });
  }
  deleteByItemId(inventoryId: number, itemId: number) {
    return this.filter(bagItem => bagItem.itemId === itemId && bagItem.inventoryId === inventoryId).then(bagItems => {
      return bagItems.delete();
    });
  }
}
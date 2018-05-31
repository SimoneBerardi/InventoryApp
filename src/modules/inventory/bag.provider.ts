import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { StorageProvider } from '../shared/providers/storage.provider';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { Bag } from './model/bag.model';
import { MemoryProvider } from '../shared/memory-provider.model';
import { BagItemProvider } from './bag-item.provider';

@Injectable()
export class BagProvider extends MemoryProvider<Bag>{
  constructor(
    _events: Events,
    _utility: UtilityProvider,
    _storage: StorageProvider,
    private _bagItems: BagItemProvider,
  ) {
    super(
      _events,
      _utility,
      Bag,
      _storage,
      "inventoryApp_bags",
    );

    this._testItems = [
      {
        id: 1,
        inventoryId: 1,
        name: "Equip.",
        bagWeight: 0,
        hasLimitedCapacity: false,
        capacity: 0,
        ignoreItemsWeight: false,
        image: this._utility.images.inventory.equipped,
        isProtected: true,
      },
      {
        id: 2,
        inventoryId: 1,
        name: "Zaino",
        bagWeight: 2.5,
        hasLimitedCapacity: false,
        capacity: 0,
        ignoreItemsWeight: false,
        image: this._utility.images.inventory.bag,
      },
      {
        id: 3,
        inventoryId: 1,
        name: "Borsa da cintura",
        bagWeight: 1,
        hasLimitedCapacity: false,
        capacity: 0,
        ignoreItemsWeight: false,
        image: this._utility.images.inventory.bag,
      },
      {
        id: 4,
        inventoryId: 1,
        name: "Zainetto magico",
        bagWeight: 3,
        hasLimitedCapacity: true,
        capacity: 20,
        ignoreItemsWeight: true,
        image: this._utility.images.inventory.bag,
      },
      {
        id: 5,
        inventoryId: 1,
        name: "Forziere",
        bagWeight: 0,
        hasLimitedCapacity: false,
        capacity: 80,
        ignoreItemsWeight: true,
        image: this._utility.images.inventory.bag,
      },
      {
        id: 6,
        inventoryId: 2,
        name: "Equip.",
        bagWeight: 0,
        hasLimitedCapacity: false,
        capacity: 0,
        ignoreItemsWeight: false,
        image: this._utility.images.inventory.equipped,
      },
      {
        id: 7,
        inventoryId: 2,
        name: "Zaino",
        bagWeight: 2.5,
        hasLimitedCapacity: false,
        capacity: 0,
        ignoreItemsWeight: false,
        image: this._utility.images.inventory.bag,
      }
    ];
  }

  getByInventoryId(inventoryId: number) {
    return this.filter(bag => bag.inventoryId === inventoryId);
  }
  deleteByInventoryId(inventoryId: number) {
    return this.filter(bagItem => bagItem.inventoryId === inventoryId).then(bags => {
      return bags.delete();
    });
  }
}
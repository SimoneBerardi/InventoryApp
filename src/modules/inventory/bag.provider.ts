import { Injectable } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { Bag } from './model/bag.model';
import { DataProvider } from '../shared/data-provider.model';

@Injectable()
export class BagProvider extends DataProvider<Bag>{
  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
  ) {
    super(
      _storage,
      _utility,
      "inventoryApp_bags",
      Bag,
    );

    this._testItems = [
      {
        id: 1,
        characterId: 1,
        name: "Equip.",
        bagWeight: 0,
        hasLimitedCapacity: false,
        capacity: 0,
        ignoreItemsWeight: false,
        image: this._utility.images.inventory.equipped,
      },
      {
        id: 2,
        characterId: 1,
        name: "Zaino",
        bagWeight: 2.5,
        hasLimitedCapacity: false,
        capacity: 0,
        ignoreItemsWeight: false,
        image: this._utility.images.inventory.bag,
      },
      {
        id: 3,
        characterId: 1,
        name: "Borsa da cintura",
        bagWeight: 1,
        hasLimitedCapacity: false,
        capacity: 0,
        ignoreItemsWeight: false,
        image: this._utility.images.inventory.bag,
      },
      {
        id: 4,
        characterId: 1,
        name: "Zainetto magico",
        bagWeight: 3,
        hasLimitedCapacity: true,
        capacity: 20,
        ignoreItemsWeight: true,
        image: this._utility.images.inventory.bag,
      },
      {
        id: 5,
        characterId: 1,
        name: "Forziere",
        bagWeight: 0,
        hasLimitedCapacity: false,
        capacity: 80,
        ignoreItemsWeight: true,
        image: this._utility.images.inventory.bag,
      },
      {
        id: 2,
        characterId: 2,
        name: "Equip.",
        bagWeight: 0,
        hasLimitedCapacity: false,
        capacity: 0,
        ignoreItemsWeight: false,
        image: this._utility.images.inventory.equipped,
      },
      {
        id: 7,
        characterId: 2,
        name: "Zaino",
        bagWeight: 2.5,
        hasLimitedCapacity: false,
        capacity: 0,
        ignoreItemsWeight: false,
        image: this._utility.images.inventory.bag,
      }
    ];
  }

  selectByCharacterId(characterId: number) {
    return this.list.filter(bag => bag.characterId === characterId);
  }
}
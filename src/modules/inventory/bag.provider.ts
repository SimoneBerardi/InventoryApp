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
        name: "Zaino",
        bagWeight: 2.5,
        hasLimitedCapacity: false,
        capacity: 0,
      },
      {
        id: 2,
        characterId: 1,
        name: "Borsa da cintura",
        bagWeight: 1,
        hasLimitedCapacity: false,
        capacity: 0,
      },
      {
        id: 3,
        characterId: 1,
        name: "Zainetto magico",
        bagWeight: 3,
        hasLimitedCapacity: true,
        capacity: 20,
      },
      {
        id: 4,
        characterId: 1,
        name: "Forziere",
        bagWeight: 80,
        hasLimitedCapacity: false,
        capacity: 0,
      },
      {
        id: 5,
        characterId: 2,
        name: "Zaino",
        bagWeight: 2.5,
        hasLimitedCapacity: false,
        capacity: 0,
      }
    ];
  }

  selectByCharacterId(characterId: number) {
    return this.list.filter(bag => bag.characterId === characterId);
  }
}
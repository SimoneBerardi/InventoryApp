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
    let itemId = 1;

    for (let i = 0; i <= bagsCount; i++) {
      for (let j = 0; j < itemsCount; j++) {
        this._testItems.push({
          id: itemId,
          characterId: 1,
          bagId: i,
          name: "Oggetto " + itemId,
          description: "Desc oggetto " + itemId,
          itemWeight: 7 - j,
          quantity: j + 1,
        });
        itemId++;
      }
    }
  }

  selectCharacterId(characterId: number) {
    return this.list.filter(bagItem => bagItem.characterId === characterId);
  }

  deleteByBagId(bagId: number) {
    this.list = this.list.filter(bagItem => bagItem.bagId !== bagId);
    return this.save();
  }
}
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

    //TODO Oggetti di test
  }

  selectCharacterId(characterId: number) {
    return this.list.filter(bagItem => bagItem.characterId === characterId);
  }
}
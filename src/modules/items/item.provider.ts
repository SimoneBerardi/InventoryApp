import { Injectable, EventEmitter } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Item } from './item.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { DataProvider } from '../shared/data-provider.model';
import { CharacterProvider } from '../characters/character.provider';

@Injectable()
export class ItemProvider extends DataProvider<Item> {
  onSelectItem: EventEmitter<ItemSelection> = new EventEmitter();
  onDeleteItem: EventEmitter<number> = new EventEmitter();

  characterItems: Item[];

  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
    private _characters: CharacterProvider,
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
        characterId: 1,
        name: "arma 1",
        description: "descrizione arma 1",
        weight: 2,
        category: 0,
      },
      {
        id: 2,
        characterId: 1,
        name: "arma 2",
        description: "descrizione arma 2",
        weight: 2.5,
        category: 0,
      },
      {
        id: 3,
        characterId: 1,
        name: "armatura 1",
        description: "descrizione armatura 1",
        weight: 5,
        category: 1,
      },
      {
        id: 4,
        characterId: 1,
        name: "armatura 2",
        description: "descrizione armatura 2",
        weight: 20,
        category: 1,
      },
      {
        id: 5,
        characterId: 1,
        name: "oggetto 1",
        description: "descrizione oggetto 1",
        weight: 1.5,
        category: 2,
      },
      {
        id: 6,
        characterId: 1,
        name: "oggetto 2",
        description: "descrizione oggetto 2",
        weight: 0.5,
        category: 2,
      },
    ];

    this._characters.onSelectCharacter.subscribe(id => {
      this._loadItems(id);
    });
    this._characters.onDeleteCharacter.subscribe(id => {
      this._deleteItems(id);
    })
  }

  delete(id: number) {
    let item = this.characterItems.find(o => o.id === id);
    this.characterItems.splice(this.characterItems.indexOf(item), 1);
    return super.delete(id).then(() => {
      this.onDeleteItem.emit(id);
      return Promise.resolve();
    });
  }
  insert(item: Item) {
    item.characterId = this._characters.selectedCharacter.id;
    this.characterItems.push(item);
    return super.insert(item);
  }

  selectItem(data: ItemSelection) {
    this.onSelectItem.emit(data);
  }

  private _loadItems(characterId: number) {
    this.characterItems = this.list.filter(o => o.characterId === characterId);
  }
  private _deleteItems(characterId: number) {
    this.list = this.list.filter(item => item.characterId !== characterId);
    return this.save();
  }
}

export interface ItemSelection {
  id: number;
  quantity?: number;
}
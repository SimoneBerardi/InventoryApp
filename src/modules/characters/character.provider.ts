import { Injectable, EventEmitter } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Character } from './character.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { DataProvider } from '../shared/data-provider.model';

@Injectable()
export class CharacterProvider extends DataProvider<Character> {

  selectedCharacter: Character;

  onSelectCharacter: EventEmitter<number> = new EventEmitter();
  onCreateCharacter: EventEmitter<number> = new EventEmitter();

  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
  ) {
    super(
      _storage,
      _utility,
      "inventoryApp_characters",
      Character);

    this._testItems = [
      {
        id: 1,
        name: "Lorian, il Primo dei Cinque",
        race: "Umano",
        className: "Guerriero",
        strength: 16,
        image: this._utility.images.avatars[0],
        size: 1,
      },
      {
        id: 2,
        name: "Yul, il Mago Guerriero",
        race: "Mezzelfo",
        className: "Mago Combattente",
        strength: 14,
        image: this._utility.images.avatars[1],
        size: 1,
      }
    ];
  }

  insert(item: Character) {
    return super.insert(item).then(() => {
      this.onCreateCharacter.emit(item.id);
      return Promise.resolve();
    });
  }

  selectCharacter(id: number) {
    this.selectedCharacter = this.list.find(character => character.id === id);
    this.onSelectCharacter.emit(id);
  }
}

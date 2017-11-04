import { Injectable } from '@angular/core';
import { Character } from '../../model/character';
import { BagItem } from '../../model/bag-item';
import { ItemsListProvider } from '../items-list/items-list';
import { CharactersListProvider } from '../characters-list/characters-list';

@Injectable()
export class SessionProvider {

  /**
   * Personaggio corrente
   */
  character: Character;

  constructor(
    private _characters: CharactersListProvider,
    private _items: ItemsListProvider,
  ) { }

  loadCharacter(character: Character) {
    character.bags.forEach(bag => {
      bag.items.forEach(bagItem => {
        bagItem.item = this._items.get(bagItem.itemId);
      });
    });
    this.character = character;
  }
  saveCharacter() {
    return this._characters.save();
  }
}

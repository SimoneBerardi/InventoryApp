import { Injectable, EventEmitter } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Character } from './character.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { DataProvider } from '../shared/data-provider.model';
import { Events } from 'ionic-angular';

@Injectable()
export class CharacterProvider extends DataProvider<Character> {

  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
    private _events: Events,
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

  selectFromSession() {
    return this.select(this._utility.session.loadedCharacterId);
  }

  delete(id: number) {
    return super.delete(id).then(() => {
      this._events.publish("character:delete", id);
      return Promise.resolve();
    });
  }

  insert(character: Character) {
    return super.insert(character).then(() => {
      this._events.publish("character:create", character.id);
      return Promise.resolve();
    });
  }

  loadCharacter(id: number) {
    this.select(id).then(character => {
      this._utility.session.loadedCharacterId = character.id;
      this._utility.session.encumberedValue = character.encumberedValue;
      this._utility.session.heavilyEncumberedValue = character.heavilyEncumberedValue;
      this._utility.session.maxCarryValue = character.maxCarryValue;
      this._events.publish("character:load", character.id);
    });
  }
}

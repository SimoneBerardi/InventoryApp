import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Character } from './character.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { DataProvider } from '../shared/data-provider.model';
import { OptionsProvider } from '../shared/providers/options.provider';
import { Units } from '../shared/options.model';
import { EncumberanceProvider } from './encumberance.provider';

@Injectable()
export class CharacterProvider extends DataProvider<Character> {
  private _character: Character;

  constructor(
    _events: Events,
    _storage: StorageProvider,
    _utility: UtilityProvider,
    private _options: OptionsProvider,
    private _encumberance: EncumberanceProvider,
  ) {
    super(
      _events,
      _storage,
      _utility,
      "inventoryApp_characters",
      Character
    );

    this._testItems = [
      {
        id: 1,
        name: "Lorian, il Primo dei Cinque",
        race: "Umano",
        className: "Guerriero",
        size: 1,
        strength: 16,
        edition: 0,
        image: this._utility.images.avatars[0],
      },
      {
        id: 2,
        name: "Yul, il Mago Guerriero",
        race: "Mezzelfo",
        className: "Mago Combattente",
        size: 1,
        strength: 14,
        edition: 0,
        image: this._utility.images.avatars[1],
      }
    ];
  }

  selectFromSession() {
    return Promise.resolve().then(() => {
      if (!this._character || this._character.id !== this._utility.session.loadedCharacterId)
        return this.select(this._utility.session.loadedCharacterId);
      else
        return Promise.resolve(null);
    }).then(character => {
      if (character !== null)
        this._character = character;
      return Promise.resolve(this._character);
    });
  }

  select(id: number) {
    return super.select(id).then(character => {
      character.encumberance = this._encumberance.calculateEncumberance(character);
      return Promise.resolve(character);
    });
  }

  loadCharacter(id: number) {
    this.select(id).then(character => {
      this._utility.session.loadedCharacterId = character.id;
      this._utility.session.encumberedValue = character.encumberance.encumbered;
      this._utility.session.heavilyEncumberedValue = character.encumberance.heavilyEncumbered;
      this._utility.session.maxCarryValue = character.encumberance.maxCarry;
      this._events.publish("Character:load", character.id);
    });
  }

  load() {
    return this._encumberance.load().then(() => {
      return super.load();
    });
  }
}

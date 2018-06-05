import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Character } from './character.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { OptionsProvider } from '../shared/providers/options.provider';
import { EncumberanceProvider } from './encumberance.provider';
import { MemoryProvider } from '../shared/memory-provider.model';

@Injectable()
export class CharacterProvider extends MemoryProvider<Character> {
  constructor(
    _events: Events,
    _utility: UtilityProvider,
    _storage: StorageProvider,
    private _options: OptionsProvider,
    private _encumberance: EncumberanceProvider,
  ) {
    super(
      _events,
      _utility,
      Character,
      _storage,
      "inventoryApp_characters",
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
        image: this._utility.images.character.avatars[0],
      },
      {
        id: 2,
        name: "Yul, il Mago Guerriero",
        race: "Mezzelfo",
        className: "Mago Combattente",
        size: 1,
        strength: 14,
        edition: 0,
        image: this._utility.images.character.avatars[1],
      }
    ];
  }

  getFromSession() {
    return this.getById(this._utility.session.loadedCharacterId);
  }
  loadCharacter(id: number) {
    this.getById(id).then(character => {
      this._utility.session.loadedCharacterId = character.id;
      this._utility.session.encumberedValue = character.encumberance.encumbered;
      this._utility.session.heavilyEncumberedValue = character.encumberance.heavilyEncumbered;
      this._utility.session.maxCarryValue = character.encumberance.maxCarry;
      this._publishEvent("load", character.id);
    });
  }

  //-- override --
  getById(id: number) {
    return super.getById(id).then(character => {
      character.encumberance = this._encumberance.calculateEncumberance(character);
      return Promise.resolve(character);
    });
  }
  load() {
    return this._encumberance.load().then(() => {
      return super.load();
    });
  }
}

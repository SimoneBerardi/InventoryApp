import { Injectable, EventEmitter } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Character, Encumberance } from './character.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { DataProvider } from '../shared/data-provider.model';
import { Events } from 'ionic-angular';
import { OptionsProvider } from '../shared/providers/options.provider';
import { Units } from '../shared/options.model';

@Injectable()
export class CharacterProvider extends DataProvider<Character> {
  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
    private _events: Events,
    private _options: OptionsProvider,
  ) {
    super(
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
    return this.select(this._utility.session.loadedCharacterId);
  }

  update(id: number, character: Character) {
    return super.update(id, character).then(() => {
      this._loadEncumberance(character);
      return Promise.resolve();
    });
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
      this._loadEncumberance(character);
      this._events.publish("character:load", character.id);
    });
  }

  private _loadEncumberance(character: Character) {
    character.encumberance = this._calculateEncumberance(character);
    this._utility.session.encumberedValue = character.encumberance.encumbered;
    this._utility.session.heavilyEncumberedValue = character.encumberance.heavilyEncumbered;
    this._utility.session.maxCarryValue = character.encumberance.maxCarry;
  }
  private _calculateEncumberance(character: Character) {
    let encumberance = new Encumberance();
    encumberance.encumbered = this._calculateEncumberanceValue(character.strength, 5);
    encumberance.heavilyEncumbered = this._calculateEncumberanceValue(character.strength, 10);
    encumberance.maxCarry = this._calculateEncumberanceValue(character.strength, 15);
    encumberance.drag = this._calculateEncumberanceValue(character.strength, 30);
    encumberance.lift = this._calculateEncumberanceValue(character.strength, 30);
    return encumberance;
  }
  private _calculateEncumberanceValue(strenght: number, multiplier: number) {
    return strenght * multiplier * (this._options.units === Units.Kg ? 0.453592 : 1);
  }
}

import { Injectable } from '@angular/core';
import { Storageable } from '../../model/storageable';
import { Storage } from '@ionic/storage';
import { Character } from '../../model/character';
import { Item } from '../../model/item';
import { TranslateProvider } from '../translate/translate';
import { Deserializable } from '../../model/jsonable';

@Injectable()
export class CharactersProvider extends Storageable {

  @Deserializable(Character)
  characters: Character[] = new Array<Character>();

  constructor(
    _storage: Storage,
    private _translate: TranslateProvider,
  ) {
    super(_storage, "inventoryApp_characters");
  }

  selectAll() {
    return this.characters;
  }
  select(id: number) {
    return this.characters.find(o => o.id === id);
  }
  update(id: number, newCharacter: Character) {
    let character = this.select(id);
    if (!character)
      throw new Error("Personaggio non trovato");

    newCharacter.id = character.id;
    Object.assign(character, newCharacter);
    return this.save();
  }
  insert(character: Character) {
    character.id = this._generateCharacterId();
    // let bag = character.addBag("Equipaggiato");
    // bag.isEquipped = true;
    // bag = character.addBag("Zaino");
    // bag.weight = 2.5;
    this.characters.push(character);
    return this.save();
  }
  delete(id: number) {
    let character = this.select(id);
    if (!character)
      throw new Error("Personaggio non trovato");

    this.characters.splice(this.characters.indexOf(character), 1);
    return this.save();
  }

  private _generateCharacterId() {
    let result = 1;
    if (this.characters.length > 0)
      result = Math.max.apply(this, this.characters.map(character => character.id)) + 1;
    return result;
  }
}

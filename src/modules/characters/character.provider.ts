import { Injectable } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Character } from './character.model';
import { UtilityProvider } from '../shared/providers/utility.provider';

@Injectable()
export class CharacterProvider {
  private _charactersKey: string = "inventoryApp_characters";

  characters: Character[] = [];

  constructor(
    private _storage: StorageProvider,
    private _utility: UtilityProvider,
  ) { }

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
    character.id = this._utility.generateListId(this.characters);
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

  clear() {
    this.characters = new Array<Character>();
    return this._storage.remove(this._charactersKey);
  }

  load() {
    return this._storage.deserialize<Character>(this._charactersKey, Character).then(characters => {
      if (characters)
        this.characters = characters as Character[];
      return Promise.resolve();
    });
  }

  save() {
    return this._storage.serialize(this._charactersKey, this.characters);
  }
}

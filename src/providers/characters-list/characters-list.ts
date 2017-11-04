import { Injectable } from '@angular/core';
import { Storageable } from '../../model/storageable';
import { Storage } from '@ionic/storage';
import { Character } from '../../model/character';
import { UtilityProvider } from '../utility/utility';
import { Item } from '../../model/item';
import { TranslateProvider } from '../translate/translate';
import { Deserializable } from '../../model/jsonable';

@Injectable()
export class CharactersListProvider extends Storageable {

  @Deserializable(Character)
  characters: Character[];

  constructor(
    _storage: Storage,
    private _translate: TranslateProvider,
  ) {
    super(_storage, "inventoryApp_characters");
  }

  /**
   * Aggiorna il personaggio e salva la lista
   * @param saveCharacter 
   */
  update(saveCharacter: Character) {
    let oldCharacter = this.characters.find(character => character.id == saveCharacter.id);
    Object.assign(oldCharacter, saveCharacter);
    return this.save();
  }
  /**
   * Aggiunge un nuovo personaggio e salva la lista
   */
  add(name: string) {
    let character;
    return this._translate.translate(["Classe", "Razza", "Equipaggiato", "Zaino"]).then(values => {
      character = new Character(name, values["Razza"], values["Classe"]);
      let bag = character.addBag(values["Equipaggiato"]);
      bag.isEquipped = true;
      bag = character.addBag(values["Zaino"]);
      bag.weight = 2.5;
      character.id = this._generateCharacterId();
      this.characters.push(character);
      return this.save();
    }).then(() => {
      return character;
    });
  }
  /**
   * Cancella il personaggio e salva la lista
   * @param character 
   */
  remove(character: Character) {
    this.characters.splice(this.characters.indexOf(character), 1);
    return this.save();
  }
  /**
     * Verifica se esiste già un personaggio con questo nome
     * @param name 
     */
  nameAlreadyExists(name: string) {
    return this.characters.find(char => char.name == name) != undefined;
  }
  /**
   * Rimuove un oggetto custom da tutti i personaggi
   * @param item 
   */
  removeItem(item: Item) {
    this.characters.forEach(character => {
      character.bags.forEach(bag => {
        bag.items.filter(bagItem => bagItem.item.id == item.id).forEach(bagItem => {
          bag.items.splice(bag.items.indexOf(bagItem), 1);
        });
      });
    });
  }

  /**
   * Genera un id progressivo per un personaggio
   */
  private _generateCharacterId() {
    let result = 1;
    if (this.characters.length > 0)
      result = Math.max.apply(this, this.characters.map(character => character.id)) + 1;
    return result;
  }
}

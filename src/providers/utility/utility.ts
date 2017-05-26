import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Options } from "../../model/options";
import { Character } from "../../model/character";
import { JsonObject } from "../../model/json-model";
import { TranslateService } from "@ngx-translate/core";
import { Session } from "../../model/session";
import { Bag } from "../../model/bag";
import { BagItem } from "../../model/bagItem";

@Injectable()
export class UtilityProvider {
  private _storageKeys =
  {
    options: "inventoryApp_options",
    characters: "inventoryApp_characters",
    bags: "inventoryApp_bags",
    bagItems: "inventoryApp_bagItems"
  };

  public images: any = {
    character: "/assets/images/character.png",
    bag: "/assets/images/bag.png",
  };
  public options: Options = new Options();
  public characters: Character[] = new Array<Character>();
  public bags: Bag[] = new Array<Bag>();
  public bagItems: BagItem[] = new Array<BagItem>();

  public session: Session = new Session();

  constructor(
    private _storage: Storage,
    private _translateService: TranslateService,
  ) {
    this._translateService.setDefaultLang("it");
  }

  public init() {
    return new Promise((resolve, reject) => {
      this.clearChache().then(() => {
        let promises = [];
        promises.push(this._loadOptions());
        promises.push(this._loadCharacters());
        promises.push(this._loadBags());
        promises.push(this._loadBagItems());
        Promise.all(promises).then(() => {
          this._translateService.use(this.options.language);
          console.log("App inizializzata");
          resolve();
        });
      });
    });
  }
  public clearChache() {
    return this._storage.clear();
  }
  public translate(key: string | Array<string>, ) {
    return this._translateService.get(key);
  }
  public addCharacter(name: string) {
    let character = new Character(name);
    character.id = this._generateCharacterId();
    this.characters.push(character);
    this._saveCharacters();
  }
  public selectCharacter(character: Character) {
    character.bags = this.bags.filter(bag => bag.characterId == character.id);
    character.bags.forEach((bag: Bag) => {
      bag.items = this.bagItems.filter(bagItem => bagItem.bagId == bag.id);
    });
    this.session.character = character;
  }
  public getImage(character: Character) {
    let result = character.image;
    if (result == null)
      result = this.images.character;
    return result;
  }

  private _saveBagItems() {
    return this._storage.set(this._storageKeys.bagItems, this.bags);
  }
  private _loadBagItems() {
    return new Promise((resolve, reject) => {
      this._storage.get(this._storageKeys.bagItems).then(value => {
        if (value != null) {
          value.forEach(bagItem => {
            this.bagItems.push(JsonObject.parse(BagItem, bagItem));
          });
        } else {
          console.log("Inizializzo gli oggetti nelle borse..."); +
            this._addMockBagItems();
          this._saveBagItems();
        }
        console.log("Oggetti nelle borse caricati");
        resolve();
      });
    });
  }
  private _saveBags() {
    return this._storage.set(this._storageKeys.bags, this.bags);
  }
  private _loadBags() {
    return new Promise((resolve, reject) => {
      this._storage.get(this._storageKeys.bags).then(value => {
        if (value != null) {
          value.forEach(bag => {
            this.bags.push(JsonObject.parse(Bag, bag));
          });
        } else {
          console.log("Inizializzo le borse..."); +
            this._addMockBags();
          this._saveBags();
        }
        console.log("Borse caricate");
        resolve();
      });
    });
  }
  private _generateCharacterId() {
    return Math.max.apply(this.characters.map(character => character.id));
  }
  private _loadCharacters() {
    return new Promise((resolve, reject) => {
      this._storage.get(this._storageKeys.characters).then(value => {
        if (value != null) {
          value.forEach(char => {
            this.characters.push(JsonObject.parse(Character, char))
          });
        } else {
          console.log("Inizializzo i personaggi...");
          this._addMockCharacters();
          this._saveCharacters();
        }
        console.log("Personaggi caricati");
        resolve();
      });
    });
  }
  private _saveCharacters() {
    return this._storage.set(this._storageKeys.characters, this.characters);
  }
  private _loadOptions() {
    return new Promise((resolve, reject) => {
      this._storage.get(this._storageKeys.options).then(value => {
        if (value != null) {
          this.options = value as Options;
        } else {
          console.log("Inizializzo le opzioni...");
          this._saveOptions();
        }
        console.log("Opzioni caricate");
        resolve();
      });
    });
  }
  private _saveOptions() {
    return this._storage.set(this._storageKeys.options, this.options);
  }

  //DEBUG
  private _addMockBagItems(){
    let bagItem = new BagItem();
    bagItem.bagId = 0;
    bagItem.name = "Armatura";
    bagItem.weight = 10;
    this.bagItems.push(bagItem);
    bagItem = new BagItem();
    bagItem.bagId = 1;
    bagItem.name = "Stocco";
    bagItem.weight = 5;
    this.bagItems.push(bagItem);
    bagItem = new BagItem();
    bagItem.bagId = 1;
    bagItem.name = "Shuriken";
    bagItem.weight = 0.5;
    this.bagItems.push(bagItem);
    bagItem = new BagItem();
    bagItem.bagId = 2;
    bagItem.name = "Giavellotto";
    bagItem.weight = 2;
    this.bagItems.push(bagItem);
  }
  private _addMockBags() {
    let bag = new Bag();
    bag.id = 0;
    bag.characterId = 1;
    bag.name = "Equipaggiato";
    bag.weight = 0;
    bag.isEquipped = true;
    this.bags.push(bag);
    bag = new Bag();
    bag.id = 1;
    bag.characterId = 1;
    bag.name = "Zaino";
    bag.weight = 2.5;
    this.bags.push(bag);
    bag = new Bag();
    bag.id = 2;
    bag.characterId = 1;
    bag.name = "Borsa da cintura";
    bag.weight = 0.5;
    this.bags.push(bag);
    bag = new Bag();
    bag.id = 3;
    bag.characterId = 1;
    bag.name = "Borsa magica";
    bag.weight = 1;
    bag.isFixedWeight = true;
    this.bags.push(bag);
  }
  private _addMockCharacters() {
    let char = new Character();
    char.id = 1;
    char.name = "Personaggio Nick";
    char.race = "Nano"
    char.class = "Guerriero";
    char.strength = 18;
    this.characters.push(char);
    char = new Character();
    char.id = 2;
    char.name = "Personaggio Lucia";
    char.race = "Umano"
    char.class = "Stregone";
    char.strength = 12;
    this.characters.push(char);
    char = new Character();
    char.id = 3;
    char.name = "Personaggio Margherita";
    char.race = "Gnomo"
    char.class = "Mago";
    char.strength = 10;
    this.characters.push(char);
  }
}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Options } from "../../model/options";
import { Character } from "../../model/character";
import { JsonObject } from "../../model/json-model";
import { TranslateService } from "@ngx-translate/core";
import { Session } from "../../model/session";
import { Bag } from "../../model/bag";
import { BagItem } from "../../model/bag-item";
import { Item } from "../../model/item";
import { Http } from "@angular/http";

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
    character: "assets/images/character_grayscale.png",
    bag: "assets/images/bag_grayscale.png",
  };
  public options: Options = new Options();
  public characters: Character[] = new Array<Character>();
  public items: Item[] = new Array<Item>();

  public session: Session = new Session();

  constructor(
    private _storage: Storage,
    private _translateService: TranslateService,
    private _http: Http,
  ) {
    this._translateService.setDefaultLang("it");
  }

  public init() {
    return new Promise((resolve, reject) => {
      // this.clearChache().then(() => {
      let promises = [];
      promises.push(this._loadOptions());
      promises.push(this._loadItems());
      promises.push(this._loadCharacters());
      Promise.all(promises).then(() => {
        this._translateService.use(this.options.language);
        console.log("App inizializzata");
        resolve();
      });
      // });
    });
  }
  public clearChache() {
    return this._storage.clear();
  }
  public translate(key: string | Array<string>, ) {
    return this._translateService.get(key);
  }
  public checkDuplicateChar(name: string) {
    return this.characters.filter(char => char.name == name).length > 0;
  }
  public addCharacter(name: string) {
    let character = new Character(name);
    character.id = this._generateCharacterId();
    this.characters.push(character);
    this._saveCharacters();
    return character;
  }
  public removeCharacter(character: Character) {
    this.characters.splice(this.characters.indexOf(character), 1);
    this._saveCharacters();
  }
  public selectCharacter(character: Character) {
    character.bags.forEach(bag => {
      bag.items.forEach(bagItem => {
        bagItem.item = this.items.filter(item => item.id == bagItem.itemId)[0];
      });
    });
    this.session.character = character;
  }
  public getImage(character: Character) {
    let result = character.image;
    if (result == null)
      result = this.images.character;
    return result;
  }
  public saveToStorage() {
    this._saveCharacters();
    this._saveOptions();
  }

  private _loadItems() {
    return new Promise((resolve, reject) => {
      this._http.get("assets/items.json").subscribe(value => {
        value.json().items.forEach(item => {
          this.items.push(JsonObject.parse(Item, item));
        });
        console.log("Oggetti caricati");
        resolve();
      });
    });
  }
  private _generateCharacterId() {
    let result = 1;
    if (this.characters.length > 0)
      result = Math.max.apply(this, this.characters.map(character => character.id)) + 1;
    return result;
  }
  private _loadCharacters() {
    return new Promise((resolve, reject) => {
      this._storage.get(this._storageKeys.characters).then(value => {
        if (value != null) {
          value = JSON.parse(value);
          value.forEach(char => {
            this.characters.push(JsonObject.parse(Character, char))
            this.characters.forEach((character: Character) => {
              character.bags.forEach((bag: Bag) => {
                bag.items.forEach((bagItem: BagItem) => {
                  bagItem.item = this.items.filter(item => item.id == bagItem.itemId)[0];
                });
              });
            });
          });
        } else {
          console.log("Inizializzo i personaggi...");
          // this._addMockCharacters();
          // this._addMockBags();
          // this._addMockBagItems();
          this._saveCharacters();
          this.characters.forEach(char => {
            console.log(JSON.stringify(char));
          });
        }
        console.log("Personaggi caricati");
        resolve();
      });
    });
  }
  private _saveCharacters() {
    return this._storage.set(this._storageKeys.characters, JSON.stringify(this.characters));
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
  // private _addMockBagItems() {
  //   let bagItem = new BagItem();
  //   bagItem.itemId = 1;
  //   this.characters[0].bags[0].items.push(bagItem);
  //   bagItem = new BagItem();
  //   bagItem.itemId = 2;
  //   this.characters[0].bags[1].items.push(bagItem);
  //   bagItem = new BagItem();
  //   bagItem.itemId = 3;
  //   bagItem.quantity = 3;
  //   this.characters[0].bags[1].items.push(bagItem);
  //   bagItem = new BagItem();
  //   bagItem.itemId = 4;
  //   bagItem.quantity = 2;
  //   this.characters[0].bags[2].items.push(bagItem);
  // }
  // private _addMockBags() {
  //   let bag = this.characters[0].addBag("Borsa da cintura");
  //   bag.weight = 0.5;
  //   bag = this.characters[0].addBag("Borsa magica");
  //   bag.weight = 1;
  //   bag.isFixedWeight = true;
  //   bag.capacity = 10;
  // }
  // private _addMockCharacters() {
  //   let char = this.addCharacter("Personaggio Nick");
  //   char.race = "Nano"
  //   char.class = "Guerriero";
  //   char.strength = 18;
  //   char = this.addCharacter("Personaggio Lucia");
  //   char.race = "Umano"
  //   char.class = "Stregone";
  //   char.strength = 12;
  //   char = this.addCharacter("Personaggio Margherita");
  //   char.race = "Gnomo"
  //   char.class = "Mago";
  // }
}

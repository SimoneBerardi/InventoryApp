import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { Character } from "../../model/character";
import { TranslateService } from "@ngx-translate/core";
import { Http } from "@angular/http";
import { OptionsProvider } from '../options/options';
import { ItemsListProvider } from '../items-list/items-list';
import { CharactersProvider } from '../characters/characters';
import { MigrationsProvider } from '../migrations/migrations';

@Injectable()
export class UtilityProviderOld {
  /**
   * Deprecato
   */
  private _storageKeys =
    {
      options: "inventoryApp_options",
      characters: "inventoryApp_characters",
      bags: "inventoryApp_bags",
      bagItems: "inventoryApp_bagItems",
      customItems: "inventoryApp_customItems",
    };

  images = {
    bag: "assets/images/bag.png",
    money: "assets/images/money.png",
    avatars: [
      "assets/images/avatar_1.png",
    ],
    logos: {
      charactersList: "assets/images/characters_list_logo.png",
      character: "assets/images/character_logo.png",
      inventory: "assets/images/inventory_logo.png",
    },
    dragon_3_5: "assets/images/dragon_3_5.png",
  };

  constructor(
    private _storage: Storage,
    private _options: OptionsProvider,
    private _items: ItemsListProvider,
    private _characters: CharactersProvider,
    private _migrations: MigrationsProvider,
  ) { }

  /**
   * Inizializza l'app
   */
  init() {
    return Promise.resolve().then(() => {
      console.log("Migrazione dati...");
      // return this._migrations.load().then(() => {
      //   return this._migrations.migrate();
      // }).then(() => {
      console.log("Caricamento opzioni...");
      return this._options.load();
    }).then(() => {
      return this._characters.remove();
    }).then(() => {
      console.log("Caricamento personaggi...");
      return this._characters.load();
    })
    // }).then(() => {
    //   console.log("Caricamento oggetti...");
    //   return this._items.load();
    // });
  }
  /**
   * Resetta l'app alle impostazioni di fabbrica
   */
  reset() {
    return this._storage.clear().then(() => {
      return this.init();
    });
  }
  /**
   * Restituisce l'immagine di un personaggio
   */
  getCharacterImage(character: Character) {
    let result = character.image;
    // if (result == null)
    result = this.images.avatars[0];
    return result;
  }
}

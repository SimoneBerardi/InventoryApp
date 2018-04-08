import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { Character } from "../../model/character";
import { TranslateService } from "@ngx-translate/core";
import { Http } from "@angular/http";
import { OptionsProvider } from '../options/options';
import { ItemsListProvider } from '../items-list/items-list';
import { CharactersListProvider } from '../characters-list/characters-list';
import { MigrationsProvider } from '../migrations/migrations';

@Injectable()
export class UtilityProvider {
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
    character: "assets/images/character_grayscale.png",
    bag: "assets/images/bag_grayscale.png",
    coin: "assets/images/coin_grayscale.png",
    avatars: [
      "assets/images/avatar_1.png",
    ]
  };

  constructor(
    private _storage: Storage,
    private _options: OptionsProvider,
    private _items: ItemsListProvider,
    private _characters: CharactersListProvider,
    private _migrations: MigrationsProvider,
  ) { }

  /**
   * Inizializza l'app
   */
  init() {
    console.log("Migrazione dati...");
    return this._migrations.load().then(() => {
      return this._migrations.migrate();
    }).then(() => {
      console.log("Caricamento opzioni...");
      return this._options.load()
    }).then(() => {
      console.log("Caricamento personaggi...");
      return this._characters.load();
    }).then(() => {
      console.log("Caricamento oggetti...");
      return this._items.load();
    });
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

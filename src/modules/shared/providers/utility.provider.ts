import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Jsonable } from '../jsonable.model';

@Injectable()
export class UtilityProvider {
  images = {
    inventory: {
      logo: "assets/images/inventory/logo.png",
      money: "assets/images/inventory/money.png",
      equipped: "assets/images/inventory/equipped.png",
      bag: "assets/images/inventory/bag.png",
      bagArrow: "assets/images/inventory/bag-arrow.png",
      status: {
        green: "assets/images/inventory/status_green.png",
        orange: "assets/images/inventory/status_orange.png",
        red: "assets/images/inventory/status_red.png",
      }
    },
    avatars: [
      "assets/images/avatar_1.png",
      "assets/images/avatar_2.png",
    ],
    logos: {
      charactersList: "assets/images/characters_list_logo.png",
      character: "assets/images/character_logo.png",
      // inventory: "assets/images/inventory_logo.png",
      items: "assets/images/items_logo.png",
    },
    buttons: {
      save: "assets/images/save_button.png",
      cancel: "assets/images/cancel_button.png",
      delete: "assets/images/delete_button.png",
      addImage: "assets/images/add_image_button.png",
    },
    dragon_3_5: "assets/images/dragon_3_5.png",
  };

  //TODO - utilizzare le variabili d'ambiente
  isDebug: boolean = true;

  constructor(
  ) { }

  /**
   * Inizializza l'app
   */
  init() {
    // return Promise.resolve().then(() => {
    //   console.log("Migrazione dati...");
    //   // return this._migrations.load().then(() => {
    //   //   return this._migrations.migrate();
    //   // }).then(() => {
    //   console.log("Caricamento opzioni...");
    //   return this._options.load();
    // }).then(() => {
    //   return this._characters.clear();
    // }).then(() => {
    //   console.log("Caricamento personaggi...");
    //   return this._characters.load();
    // })
    // }).then(() => {
    //   console.log("Caricamento oggetti...");
    //   return this._items.load();
    // });
  }

  generateListId(list: Enumerable[]) {
    let result = 1;
    if (list.length > 0)
      result = Math.max.apply(this, list.map(item => item.id)) + 1;
    return result;
  }

  enumerateEnum(enumType: any): EnumListItem[] {
    let result = [];
    for (let enumValue in enumType) {
      if (!isNaN(Number(enumValue))) {
        result.push({
          key: Number(enumValue),
          value: enumType[enumValue]
        });
      }
    }
    return result;
  }

  castNumberProps(item: any, props: string[]) {
    props.forEach(prop => {
      item[prop] = Number(item[prop]);
    });
  }

  roundUp(value: number, decimals: number = 2) {
    return parseFloat(value.toFixed(decimals));
  }
}

export interface Enumerable {
  id: number;
}
export interface EnumListItem {
  key: number;
  value: any;
}

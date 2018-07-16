import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../model/session.model';
import { AppManifest } from '../model/app-manifest.model';

@Injectable()
export class UtilityProvider {

  private _manifestUrl = "assets/app-manifest.json";

  emails = {
    simo: "simonberard@gmail.com",
    mauro: "mauro.arneri@outlook.it",
  }

  images = {
    character: {
      list_logo: "assets/images/character/list_logo.gif",
      logo: "assets/images/character/logo.gif",
      avatars: [
        "assets/images/character/avatars/avatar_1.png",
        "assets/images/character/avatars/avatar_2.png",
      ],
      game_version: "assets/images/character/game_version.svg",
      strength: "assets/images/character/strenght.svg",
      addImage: "assets/images/character/add_image_button.png",
    },
    inventory: {
      logo: "assets/images/inventory/logo.gif",
      money: "assets/images/inventory/money.svg",
      equipped: "assets/images/inventory/equipped.svg",
      bag: "assets/images/inventory/bag.svg",
      bagArrow: "assets/images/inventory/bag-arrow.png",
      status: {
        green: "assets/images/inventory/status_green.png",
        orange: "assets/images/inventory/status_orange.png",
        red: "assets/images/inventory/status_red.png",
      },
      wheel_back: "assets/images/inventory/wheel_back.png",
    },
    items: {
      logo: "assets/images/items_logo.gif",
    },
    credits: {
      logo: "assets/images/credits/logo.png",
      name: "assets/images/credits/AB_logo.png",
      simoAvatar: "assets/images/credits/simo-avatar.svg",
      mauroAvatar: "assets/images/credits/mauro-avatar.svg",
    },

    buttons: {
      save: "assets/images/save_button.png",
      cancel: "assets/images/cancel_button.png",
      delete: "assets/images/delete_button.png",
    },

  };

  manifest: AppManifest;
  session: Session = new Session();

  constructor(
    private _http: HttpClient,
  ) { }

  /**
   * Inizializza l'app
   */
  init() {
    return this._http.get(this._manifestUrl).toPromise().then(jsonManifest => {
      this.manifest = new AppManifest();
      Object.assign(this.manifest, jsonManifest);
      return Promise.resolve();
    });
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

  sortAlfabetically(array: any[], property: string) {
    let props = property.split(".");
    array.sort((a, b) => {
      let valueA = a;
      let valueB = b;
      props.forEach(prop => {
        valueA = valueA[prop];
        valueB = valueB[prop]
      });
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
      if (valueA < valueB)
        return -1;
      if (valueA > valueB)
        return 1;
      return 0;
    })
  }
}

export interface Enumerable {
  id: number;
}
export interface EnumListItem {
  key: number;
  value: any;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../model/session.model';
import { AppManifest } from '../model/app-manifest.model';

@Injectable()
export class UtilityProvider {

  private _manifestUrl = "assets/app-manifest.json";

  emails = {
    simo: "simonberard@gmail.com",
    mauro: "",
  }

  images = {
    character: {
      list_logo: "assets/images/character/list_logo.png",
      logo: "assets/images/character/logo.png",
      avatars: [
        "assets/images/character/avatars/avatar_1.png",
        "assets/images/character/avatars/avatar_2.png",
      ],
      game_version: "assets/images/character/game_version.svg",
      strength: "assets/images/character/strenght.svg"
    },
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
      },
      wheel_back: "assets/images/inventory/wheel_back.png",
    },
    credits: {
      logo: "assets/images/credits/logo.png",
      simoAvatar: "assets/images/credits/simo-avatar.png",
      mauroAvatar: "assets/images/credits/mauro-avatar.png",
    },

    logos: {
      items: "assets/images/items_logo.png",
    },
    buttons: {
      save: "assets/images/save_button.png",
      cancel: "assets/images/cancel_button.png",
      delete: "assets/images/delete_button.png",
      addImage: "assets/images/add_image_button.png",
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
}

export interface Enumerable {
  id: number;
}
export interface EnumListItem {
  key: number;
  value: any;
}
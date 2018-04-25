import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CharacterListPage } from '../modules/characters/pages/character-list/character-list';
import { OptionsProvider } from '../modules/shared/providers/options.provider';
import { CharacterProvider } from '../modules/characters/character.provider';
import { ItemProvider } from '../modules/items/item.provider';
import { InventoryProvider } from '../modules/inventory/inventory.provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _options: OptionsProvider,
    private _characters: CharacterProvider,
    private _items: ItemProvider,
    private _inventory: InventoryProvider,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (location.href.indexOf("#") >= 0)
        location.assign(location.origin);

      let promises = [];
      promises.push(this._options.load());
      promises.push(this._characters.load());
      promises.push(this._items.load());
      promises.push(this._inventory.load());
      Promise.all(promises).then(() => {
        this.rootPage = "CharacterListPage";
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });
  }
}


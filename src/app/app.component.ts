import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OptionsProvider } from '../app/shared/providers/options.provider';
import { CharacterProvider } from '../app/characters/character.provider';
import { ItemProvider } from '../app/items/item.provider';
import { UtilityProvider } from '../app/shared/providers/utility.provider';
import { MigrationProvider } from '../app/shared/providers/migration.provider';
import { InventoryInterfaceProvider } from '../app/inventory/inventory-interface.provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _utility: UtilityProvider,
    private _options: OptionsProvider,
    private _characters: CharacterProvider,
    private _items: ItemProvider,
    private _inventoryInterface: InventoryInterfaceProvider,
    private _migrations: MigrationProvider,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (location.href.indexOf("#") >= 0)
        location.assign(location.origin);

      return this._utility.init();
    }).then(() => {
      return this._migrations.load();
    }).then(() => {
      let promises = [];
      promises.push(this._options.load());
      promises.push(this._characters.load());
      promises.push(this._items.load());
      promises.push(this._inventoryInterface.load());
      return Promise.all(promises);
    }).then(() => {
      this.rootPage = "CharacterListPage";
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


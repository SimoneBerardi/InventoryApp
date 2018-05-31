import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { DataProvider } from '../data-provider.model';
import { Theme } from '../model/theme.model';
import { StorageProvider } from './storage.provider';
import { UtilityProvider } from './utility.provider';
import { MemoryProvider } from '../memory-provider.model';

@Injectable()
export class ThemeProvider extends MemoryProvider<Theme>{
  constructor(
    _events: Events,
    _utility: UtilityProvider,
    _storage: StorageProvider,
    private _http: HttpClient,
  ) {
    super(
      _events,
      _utility,
      Theme,
      _storage,
      "inventoryApp_themes",
    );
  }

  load() {
    return super.load().then(() => {
      if (this.length == 0)
        return this._http.get(this._utility.themesUrl).toPromise().then((jsonThemes: Object[]) => {
          let themes = jsonThemes.map(jsonTheme => {
            let theme = this.create();
            theme.fromJson(jsonTheme);
            return theme;
          });
          return this.addMany(themes);
        });
      else
        return Promise.resolve();
    });
  }
}
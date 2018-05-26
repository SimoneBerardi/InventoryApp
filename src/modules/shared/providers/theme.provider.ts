import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataProvider } from '../data-provider.model';
import { Theme } from '../theme.model';
import { StorageProvider } from './storage.provider';
import { UtilityProvider } from './utility.provider';

@Injectable()
export class ThemeProvider extends DataProvider<Theme>{
  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
    private _http: HttpClient,
  ) {
    super(
      _storage,
      _utility,
      "inventoryApp_themes",
      Theme
    );
  }

  load() {
    return super.load().then(() => {
      if (this._list.length == 0)
        return this._http.get(this._utility.themesUrl).toPromise().then((jsonThemes: Object[]) => {
          let themes = jsonThemes.map(jsonTheme => {
            let theme = new Theme();
            Object.assign(theme, jsonTheme);
            return theme;
          });
          return this.insertMany(themes);
        });
      else
        return Promise.resolve();
    });
  }
}
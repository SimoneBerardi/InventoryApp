import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../model/theme.model';
import { UtilityProvider } from './utility.provider';

@Injectable()
export class ThemeProvider {
  private _themesUrl = "assets/themes.json";
  private _themes: Theme[];

  constructor(
    private _http: HttpClient,
    private _utility: UtilityProvider,
  ) { }

  getAll() {
    return Promise.resolve(this._themes);
  }
  getById(id: number) {
    return Promise.resolve(this._themes.find(theme => theme.id === id));
  }

  load() {
    return this._http.get(this._themesUrl).toPromise().then((jsonThemes: Object[]) => {
      this._themes = jsonThemes as Theme[];
      this._utility.sortAlfabetically(this._themes, "name");
      return Promise.resolve();
    });
  }
}
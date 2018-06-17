import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../model/theme.model';

@Injectable()
export class ThemeProvider {
  private _themesUrl = "assets/themes.json";
  private _themes: Theme[];

  constructor(
    private _http: HttpClient,
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
      return Promise.resolve();
    });
  }
}
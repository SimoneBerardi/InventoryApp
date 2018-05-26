import { Injectable } from '@angular/core';
import { Options, Units, Decimals } from '../options.model';
import { StorageProvider } from './storage.provider';
import { TranslateProvider } from './translate.provider';
import { ThemeProvider } from './theme.provider';
import { Theme } from '../theme.model';
import { DataProvider } from '../data-provider.model';
import { UtilityProvider } from './utility.provider';

@Injectable()
export class OptionsProvider extends DataProvider<Options>{
  private _options: Options = new Options();

  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
    private _translate: TranslateProvider,
    private _themes: ThemeProvider,
  ) {
    super(
      _storage,
      _utility,
      "inventoryApp_options",
      Options
    );
  }

  get language() {
    return this._options.language;
  }
  set language(value: string) {
    this._options.language = value;
  }
  get theme() {
    return this._options.theme;
  }
  set theme(value: Theme) {
    this._options.theme = value;
  }
  get decimals() {
    return this._options.decimals;
  }
  set decimals(value: Decimals) {
    this._options.decimals = value;
  }
  get units() {
    return this._options.units;
  }
  set units(value: Units) {
    this._options.units = value;
  }

  updateOptions(options: Options) {
    let oldOptions = Object.assign({}, this._options);
    return super.update(this._options.id, options).then(() => {
      this._options = options;
      if (oldOptions.language != this._options.language)
        this._setLanguage();
      else
        return Promise.resolve();
    }).then(() => {
      return this._loadTheme();
    });
  }
  load() {
    return super.load().then(() => {
      if (this._list.length == 0) {
        let options = new Options();
        if (this._utility.isDebug)
          options.language = "it";
        else
          options.language = this._translate.browserLang;
        return this.insert(options);
      }
      else
        return Promise.resolve();
    }).then(() => {
      this._options = this._list[0];
      return Promise.all([
        this._loadTheme(),
        this._setLanguage(),
      ]).then(() => {
        return Promise.resolve();
      });
    });
  }

  clear() {
    this._options = new Options();
    return super.clear();
  }

  private _setLanguage() {
    return this._translate.setLanguage(this._options.language);
  }
  private _loadTheme() {
    return this._themes.select(this._options.themeId).then(theme => {
      this._options.theme = theme;
      this._applyStyle();
      return Promise.resolve();
    });
  }
  private _applyStyle() {
    let cssText = "--base-color: " + this.theme.baseColor + "; --contrast-color: " + this.theme.contrastColor + ";";
    document.querySelector("body").style.cssText = cssText;
  }
}


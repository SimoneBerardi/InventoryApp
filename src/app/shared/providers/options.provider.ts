import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Options, Units, Decimals } from '../model/options.model';
import { StorageProvider } from './storage.provider';
import { TranslateProvider } from './translate.provider';
import { ThemeProvider } from './theme.provider';
import { Theme } from '../model/theme.model';
import { UtilityProvider } from './utility.provider';
import { MemoryProvider } from '../memory-provider.model';

@Injectable()
export class OptionsProvider extends MemoryProvider<Options>{
  private _options: Options;

  constructor(
    _events: Events,
    _utility: UtilityProvider,
    _storage: StorageProvider,
    private _translate: TranslateProvider,
    private _themes: ThemeProvider,
  ) {
    super(
      _events,
      _utility,
      Options,
      _storage,
      "inventoryApp_options",
      "Options",
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

  getOptions() {
    return this.find((options, index, list) => list.indexOf(options) === 0);
  }
  updateOptions(options: Options) {
    let oldOptions = Object.assign({}, this._options);
    return super.modify(this._options.id, options).then(() => {
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
    return this._themes.load().then(() => {
      return super.load();
    }).then(() => {
      if (this.length == 0) {
        let options = this.create();
        if (this._utility.manifest.isDebug)
          options.language = "en";
        else
          options.language = this._translate.browserLang;
        return this.add(options);
      }
      else
        return Promise.resolve();
    }).then(() => {
      return this.getOptions();
    }).then(options => {
      this._options = options;
      return Promise.all([
        this._loadTheme(),
        this._setLanguage(),
      ]).then(() => {
        return Promise.resolve();
      });
    });
  }

  clear() {
    this._options = this.create();
    return super.clear();
  }

  private _setLanguage() {
    return this._translate.setLanguage(this._options.language);
  }
  private _loadTheme() {
    return this._themes.getById(this._options.themeId).then(theme => {
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


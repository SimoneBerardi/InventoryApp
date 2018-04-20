import { Injectable } from '@angular/core';
import { Options } from '../options.model';
import { StorageProvider } from './storage.provider';
import { TranslateProvider } from './translate.provider';

@Injectable()
export class OptionsProvider {
  private _optionsKey: string = "inventoryApp_options";

  private _options: Options = new Options();

  constructor(
    private _storage: StorageProvider,
    private _translate: TranslateProvider,
  ) {
    this.language = this._translate.browserLang;
  }

  get language() {
    return this._options.language;
  }
  set language(value: string) {
    this._options.language = value;
  }
  get baseColor() {
    return this._options.baseColor;
  }
  set baseColor(value: string) {
    this._options.baseColor = value;
    this._applyStyle();
  }
  get contrastColor() {
    return this._options.contrastColor;
  }
  set contrastColor(value: string) {
    this._options.contrastColor = value;
    this._applyStyle();
  }

  setLanguage(language: string) {
    this.language = language;
    return this._translate.setLanguage(language).then(() => {
      return this.save();
    });
  }

  clear() {
    this._options = new Options();
    return this._storage.remove(this._optionsKey);
  }

  load() {
    return this._storage.deserialize<Options>(this._optionsKey, Options).then(options => {
      if (options)
        this._options = options as Options;
      return this.setLanguage(this._options.language);
    }).then(() => {
      this._applyStyle();
      return Promise.resolve();
    });
  }

  save() {
    return this._storage.serialize(this._optionsKey, this._options);
  }

  private _applyStyle() {
    let cssText = "--base-color: " + this.baseColor + "; --contrast-color: " + this.contrastColor + ";";
    document.querySelector("body").style.cssText = cssText;
  }
}


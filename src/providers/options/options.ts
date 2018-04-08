import { Injectable } from '@angular/core';
import { Storageable } from '../../model/storageable';
import { Storage } from '@ionic/storage';
import { TranslateProvider } from '../translate/translate';

@Injectable()
export class OptionsProvider extends Storageable {

  language: string;
  theme: Theme;

  constructor(
    _storage: Storage,
    private _translate: TranslateProvider,
  ) {
    super(_storage, "inventoryApp_options");
  }

  setLanguage(language: string) {
    this.language = language;
    return this._translate.setLanguage(language).then(() => {
      return this.save();
    });
  }

  load() {
    return super.load().then(() => {
      if (!this.language)
        this.language = this._translate.browserLang;
      if (!this.theme)
        this.theme = new Theme();
      return this._translate.setLanguage(this.language);
    });
  }
}

export class Theme {
  baseColor: string = "#333333";
  contrastColor: string = "#D3B158";

  get style() {
    return {
      "background-color": this.baseColor,
      "color": this.contrastColor,
    };
  }
  get invertedStyle() {
    return {
      "background-color": this.contrastColor,
      "color": this.baseColor,
    };
  }
}
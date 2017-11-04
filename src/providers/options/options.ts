import { Injectable } from '@angular/core';
import { Storageable } from '../../model/storageable';
import { Storage } from '@ionic/storage';
import { TranslateProvider } from '../translate/translate';

@Injectable()
export class OptionsProvider extends Storageable {

  language: string;

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
      return this._translate.setLanguage(this.language);
    });
  }

}

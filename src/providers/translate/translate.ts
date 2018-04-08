import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslateProvider {

  constructor(
    private _translate: TranslateService,
  ) {
    this._translate.setDefaultLang(this.browserLang);
  }

  get browserLang(){
    return this._translate.getBrowserLang();
  }

  /**
   * Imposta il linguaggio
   * @param language 
   */
  setLanguage(language: string) {
    return this._translate.use(language).toPromise();
  }
  /**
   * Traduce una o più chiavi
   * @param key 
   */
  translate(key: string | Array<string>, ) {
    return this._translate.get(key).toPromise();
  }

}

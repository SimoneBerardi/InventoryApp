import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from "../../providers/utility/utility";
import { OptionsProvider } from '../../providers/options/options';
import { InterfaceProvider } from '../../providers/interface/interface';
import { TranslateProvider } from '../../providers/translate/translate';

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage implements OnInit {

  language: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _options: OptionsProvider,
    private _interface: InterfaceProvider,
    private _translate: TranslateProvider,
    private _utility: UtilityProvider,
  ) {
  }

  ngOnInit() {
    this.language = this._options.language;
  }

  cancel() {
    return this.navCtrl.pop();
  }
  save() {
    return this._options.setLanguage(this.language).then(() => {
      return this._options.save();
    }).then(() => {
      return this.navCtrl.pop();
    });
  }
  reset() {
    return this._translate.translate(["Attenzione", "FareResetCompleto?"]).then(values => {
      let title = values["Attenzione"];
      let message = values["FareResetCompleto?"];
      return this._interface.askConfirmation(title, message);
    }).then(isConfirmed => {
      if (isConfirmed)
        return this._utility.reset().then(() => {
          return this.navCtrl.setRoot("CharactersListPage");
        });
      else
        return Promise.resolve();
    }).catch(() =>{});
  }
}

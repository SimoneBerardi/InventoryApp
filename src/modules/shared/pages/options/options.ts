import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OptionsProvider } from '../../providers/options.provider';
import { InterfaceProvider } from '../../providers/interface.provider';
import { TranslateProvider } from '../../providers/translate.provider';
import { UtilityProvider } from '../../providers/utility.provider';

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  headerLogo: string;
  headerTitle: string;

  language: string;
  baseColor: string;
  contrastColor: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _options: OptionsProvider,
    private _interface: InterfaceProvider,
    private _translate: TranslateProvider,
    private _utility: UtilityProvider,
  ) {
    this.headerLogo = this._utility.images.logos.character;
    this.headerTitle = "Opzioni";
  }

  ionViewDidLoad() {
    this.language = this._options.language;
    this.baseColor = this._options.baseColor;
    this.contrastColor = this._options.contrastColor;
  }

  changeColor(name: string) {
    if (name === "contrast") {
      let value = this.contrastColor === "#D3B158" ? "orange" : "#D3B158";
      this.contrastColor = value;
    } else if (name === "base") {
      let value = this.baseColor === "#333333" ? "black" : "#333333";
      this.baseColor = value;
    }
  }

  cancel() {
    return this.navCtrl.pop();
  }

  save() {
    this._interface.showLoader({
      content: "Salvataggio",
      dismissOnPageChange: true,
    }).then(() => {
      if (this.language != this._options.language)
        return this._options.setLanguage(this.language);
      else
        return Promise.resolve();
    }).then(() => {
      if (this.baseColor != this._options.baseColor)
        this._options.baseColor = this.baseColor;
      if (this.contrastColor != this._options.contrastColor)
        this._options.contrastColor = this.contrastColor;
    }).then(() => {
      return this._options.save();
    }).then(() => {
      return this.navCtrl.pop();
    });
  }

  reset() {
    return this._translate.translate(["Attenzione", "FareResetCompleto?"]).then(values => {
      let title = values["Attenzione"];
      let message = values["FareResetCompleto?"];
      return this._interface.askConfirmationOld(title, message);
    }).then(isConfirmed => {
      if (isConfirmed)
        //   return this._utility.reset().then(() => {
        //     return this.navCtrl.setRoot("CharactersListPage");
        //   });
        // else
        return Promise.resolve();
    }).catch(() => { });
  }
}

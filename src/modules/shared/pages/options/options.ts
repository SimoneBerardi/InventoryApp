import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionsProvider } from '../../providers/options.provider';
import { InterfaceProvider } from '../../providers/interface.provider';
import { TranslateProvider } from '../../providers/translate.provider';
import { UtilityProvider } from '../../providers/utility.provider';
import { Units, Options } from '../../options.model';

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  private _form: FormGroup;

  headerLogo: string;
  headerTitle: string;

  units: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _formBuilder: FormBuilder,
    private _options: OptionsProvider,
    private _interface: InterfaceProvider,
    private _translate: TranslateProvider,
    private _utility: UtilityProvider,
  ) {
    this._form = this._formBuilder.group({
      language: ["", Validators.required],
      baseColor: ["", Validators.required],
      contrastColor: ["", Validators.required],
      units: [0, Validators.required],
      decimals: [0, Validators.required],
    });
    this.headerLogo = this._utility.images.logos.character;
    this.headerTitle = "Opzioni";

    this.units = this._utility.enumerateEnum(Units);
  }

  ionViewDidLoad() {
    this._form.reset({
      language: this._options.language,
      baseColor: this._options.baseColor,
      contrastColor: this._options.contrastColor,
      units: this._options.units,
      decimals: this._options.decimals,
    });
  }

  save() {
    this._interface.showLoader({
      content: "Salvataggio",
      dismissOnPageChange: true,
    }).then(() => {
      let model = this._form.value;
      let options = new Options();
      Object.assign(options, model);
      this._utility.castNumberProps(options, ["decimals"]);
      return this._options.update(options);
    }).then(() => {
      return this.navCtrl.pop();
    });
  }

  cancel() {
    return this.navCtrl.pop();
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

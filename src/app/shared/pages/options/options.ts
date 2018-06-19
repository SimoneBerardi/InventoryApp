import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionsProvider } from '../../providers/options.provider';
import { InterfaceProvider } from '../../providers/interface.provider';
import { TranslateProvider } from '../../providers/translate.provider';
import { UtilityProvider } from '../../providers/utility.provider';
import { ThemeProvider } from '../../providers/theme.provider';
import { Theme } from '../../model/theme.model';
import { Units, Decimals } from '../../model/options.model';
import { MigrationProvider } from '../../providers/migration.provider';

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
  decimals: any[];
  themes: Theme[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _formBuilder: FormBuilder,
    private _options: OptionsProvider,
    private _interface: InterfaceProvider,
    private _translate: TranslateProvider,
    private _utility: UtilityProvider,
    private _themes: ThemeProvider,
    private _migrations: MigrationProvider,
  ) {
    this._form = this._formBuilder.group({
      language: ["", Validators.required],
      units: [0, Validators.required],
      decimals: [0, Validators.required],
      themeId: [0, Validators.required],
    });
    // this.headerLogo = this._utility.images.logos.;
    this.headerTitle = "Opzioni";

    this.units = this._utility.enumerateEnum(Units);
    this.decimals = this._utility.enumerateEnum(Decimals);
  }

  ionViewDidLoad() {
    this._form.reset({
      language: this._options.language,
      units: this._options.units,
      decimals: this._options.decimals,
      themeId: this._options.theme.id,
    });
    this._themes.getAll().then(themes => {
      this.themes = themes;
    })
  }

  get isBeta() {
    return this._utility.manifest.isBeta;
  }

  save() {
    this._interface.showLoader({
      content: "Salvataggio",
      dismissOnPageChange: true,
    }).then(() => {
      let model = this._form.value;
      let options = this._options.create();
      Object.assign(options, model);
      return this._options.updateOptions(options);
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

  import() {
    return this._migrations.importDataV1().then(() => {
      return this._interface.hideLoader();
    }).catch(error => {
      this._interface.showAndLogError(error);
    });
  }

  showCredits() {
    this.navCtrl.push("CreditsPage");
  }
}

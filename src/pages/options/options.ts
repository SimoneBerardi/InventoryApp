import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UtilityProvider } from "../../providers/utility/utility";
import { CustomComponent } from "../../model/interface";

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage extends CustomComponent implements OnInit {

  public language: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    _utility: UtilityProvider,
    _alertCtrl: AlertController,
  ) {
    super(_utility, _alertCtrl);
  }

  ngOnInit() {
    this.language = this._utility.language;
  }

  public cancel() {
    this.navCtrl.pop();
  }
  public save() {
    this._utility.setLanguage(this.language).then(() => {
      this._utility.saveToStorage();
      this.navCtrl.pop();
    });
  }
  public reset() {
    this._utility.translate(["Attenzione", "FareResetCompleto?"]).subscribe(values => {
      let title = values["Attenzione"];
      let message = values["FareResetCompleto?"];
      this._askConfirmation(title, message).then(() => {
        this._utility.clearChache().then(() => {
          this._utility.init().then(() => {
            this.navCtrl.setRoot("CharactersListPage");
          });
        });
      }).catch(() => { });
    });

  }

}

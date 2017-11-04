import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-money-details',
  templateUrl: 'money-details.html',
})
export class MoneyDetailsPage {
  copper: string;
  silver: string;
  electrum: string;
  gold: string;
  platinum: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _session: SessionProvider,
  ) {
    this.copper = this.coins.Copper.toString();
    this.silver = this.coins.Silver.toString();
    this.electrum = this.coins.Electrum.toString();
    this.gold = this.coins.Gold.toString();
    this.platinum = this.coins.Platinum.toString();
  }

  get coins() {
    return this._session.character.coins;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
  save() {
    this._validate();
    this.coins.Copper = parseFloat(this.copper);
    this.coins.Silver = parseFloat(this.silver);
    this.coins.Electrum = parseFloat(this.electrum);
    this.coins.Gold = parseFloat(this.gold);
    this.coins.Platinum = parseFloat(this.platinum);
    this._session.saveCharacter();
    this.viewCtrl.dismiss();
  }

  private _validate() {
    if (this.copper == "")
      this.copper = "0";
    if (this.silver == "")
      this.silver = "0";
    if (this.electrum == "")
      this.electrum = "0";
    if (this.gold == "")
      this.gold = "0";
    if (this.platinum == "")
      this.platinum = "0";
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilityProvider } from "../../providers/utility/utility";

@IonicPage()
@Component({
  selector: 'page-money-details',
  templateUrl: 'money-details.html',
})
export class MoneyDetailsPage {
  public copper: string;
  public silver: string;
  public electrum: string;
  public gold: string;
  public platinum: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _utility: UtilityProvider,
  ) {
    this.copper = this.coins.Copper.toString();
    this.silver = this.coins.Silver.toString();
    this.electrum = this.coins.Electrum.toString();
    this.gold = this.coins.Gold.toString();
    this.platinum = this.coins.Platinum.toString();
  }

  public get coins() {
    return this._utility.session.character.coins;
  }

  public cancel() {
    this.viewCtrl.dismiss();
  }
  public save() {
    this._validate();
    this.coins.Copper = parseFloat(this.copper);
    this.coins.Silver = parseFloat(this.silver);
    this.coins.Electrum = parseFloat(this.electrum);
    this.coins.Gold = parseFloat(this.gold);
    this.coins.Platinum = parseFloat(this.platinum);
    this._utility.saveToStorage();
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

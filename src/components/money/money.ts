import { Component } from '@angular/core';
import { UtilityProvider } from "../../providers/utility/utility";
import { AlertController, ModalController } from "ionic-angular";

@Component({
  selector: 'money',
  templateUrl: 'money.html'
})
export class MoneyComponent {

  constructor(
    private _utility: UtilityProvider,
    private _alertCtrl: AlertController,
    private _modalCtrl: ModalController,
  ) {
  }

  public get coins() {
    return this._utility.session.character.coins;
  }
  public get image() {
    return this._utility.images.coin;
  }
  public get weight() {
    return this.coins.weight;
  }
  public get hasCoins() {
    return this.coins.hasValue;
  }
  public get copper() {
    return this.coins.Copper;
  }
  public get silver() {
    return this.coins.Silver;
  }
  public get electrum() {
    return this.coins.Electrum;
  }
  public get gold() {
    return this.coins.Gold;
  }
  public get platinum() {
    return this.coins.Platinum;
  }

  public modify() {
    this._modalCtrl.create("MoneyDetailsPage").present();
  }

}

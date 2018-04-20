import { Component } from '@angular/core';
import { UtilityProviderOld } from "../../providers/utility/utility";
import { ModalController } from "ionic-angular";
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'money',
  templateUrl: 'money.html'
})
export class MoneyComponent {

  constructor(
    private _utility: UtilityProviderOld,
    private _modalCtrl: ModalController,
    private _session: SessionProvider,
  ) {
  }

  get coins() {
    return this._session.character.coins;
  }
  get image() {
    return this._utility.images.money;
  }
  get weight() {
    return this.coins.weight;
  }
  get hasCoins() {
    return this.coins.hasValue;
  }
  get copper() {
    return this.coins.Copper;
  }
  get silver() {
    return this.coins.Silver;
  }
  get electrum() {
    return this.coins.Electrum;
  }
  get gold() {
    return this.coins.Gold;
  }
  get platinum() {
    return this.coins.Platinum;
  }

  modify() {
    this._modalCtrl.create("MoneyDetailsPage").present();
  }

}

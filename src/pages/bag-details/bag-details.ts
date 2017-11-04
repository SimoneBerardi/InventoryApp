import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Bag } from "../../model/bag";
import { SessionProvider } from '../../providers/session/session';
import { InterfaceProvider } from '../../providers/interface/interface';
import { TranslateProvider } from '../../providers/translate/translate';

@IonicPage()
@Component({
  selector: 'page-bag-details',
  templateUrl: 'bag-details.html',
})
export class BagDetailsPage {
  bag: Bag;
  name: string;
  weight: string;
  isFixedWeight: boolean;
  capacity: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _session: SessionProvider,
    private _interface: InterfaceProvider,
    private _translate: TranslateProvider,
  ) {
    if (navParams.data.bag) {
      this.bag = navParams.data.bag;
      this.name = this.bag.name;
      this.weight = this.bag.weight.toString();
      this.isFixedWeight = this.bag.isFixedWeight;
      this.capacity = this.bag.capacity.toString();
    }
  }

  get showDelete() {
    return this._session.character.bags.length > 2;
  }

  cancel() {
    this.navCtrl.pop();
  }
  save() {
    this._validate();
    this._session.saveCharacter();
    this.navCtrl.pop();
  }
  delete() {
    return this._translate.translate(["ButtareBorsa", "ButtareBorsa?", "Si", "No"]).then(values => {
      let title = values["ButtareBorsa"];
      let message = values["ButtareBorsa?"].replace("{0}", this.bag.name);
      return this._interface.askConfirmation(title, message);
    }).then(isConfirmed => {
      if (isConfirmed) {
        return this._delete().then(() => {
          return this.navCtrl.pop();
        });
      } else
        return Promise.resolve();
    }).catch(() => { });
  }

  private _delete() {
    return this._askMoveItems().then(bag => {
      if (bag != null) {
        this.bag.items.forEach(bagItem => {
          bag.addItem(bagItem.item, bagItem.quantity);
        });
      }
      this._session.character.removeBag(this.bag);
      return this._session.saveCharacter();
    });
  }
  private _askMoveItems() {
    if (this.bag.items.length > 0) {
      return this._translate.translate(["SpostamentoOggetti", "SpostareOggetti?"]).then(values => {
        let title = values["SpostamentoOggetti"];
        let message = values["SpostareOggetti?"];
        return this._interface.askConfirmation(title, message);
      }).then(isConfirmed => {
        if (isConfirmed)
          return this._interface.selectBag(this._session.character);
        else
          return Promise.resolve(null);
      });
    } else
      return Promise.resolve(null);
  }

  private _validate() {
    this.bag.name = this.name;
    this.bag.weight = parseFloat(this.weight);
    this.bag.isFixedWeight = this.isFixedWeight;
    this.bag.capacity = parseFloat(this.capacity);
    if (this.bag.weight.toString() == "")
      this.bag.weight = 0;
    if (this.bag.isFixedWeight && this.bag.capacity.toString() == "")
      this.bag.capacity = 0;
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Bag } from "../../model/bag";
import { UtilityProvider } from "../../providers/utility/utility";
import { CustomComponent } from "../../model/interface";

@IonicPage()
@Component({
  selector: 'page-bag-details',
  templateUrl: 'bag-details.html',
})
export class BagDetailsPage extends CustomComponent {
  public bag: Bag = new Bag();
  public name: string;
  public weight: string;
  public isFixedWeight: boolean;
  public capacity: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    _utility: UtilityProvider,
    _alertCtrl: AlertController,
  ) {
    super(_utility, _alertCtrl);
    if (navParams.data.bag) {
      this.bag = navParams.data.bag;
      this.name = this.bag.name;
      this.weight = this.bag.weight.toString();
      this.isFixedWeight = this.bag.isFixedWeight;
      this.capacity = this.bag.capacity.toString();
    }
  }

  public get showDelete() {
    return this._utility.session.character.bags.length > 2;
  }

  public cancel() {
    this.navCtrl.pop();
  }
  public save() {
    this._validate();
    this._utility.saveToStorage();
    this.navCtrl.pop();
  }
  public delete() {
    this._utility.translate(["ButtareBorsa", "ButtareBorsa?", "Si", "No"]).subscribe(values => {
      let title = values["ButtareBorsa"];
      let message = values["ButtareBorsa?"].replace("{0}", this.bag.name);
      this._askConfirmation(title, message).then(() => {
        this._askMoveItems().then(bag => {
          if (bag != null) {
            this.bag.items.forEach(bagItem => {
              bag.addItem(bagItem.item, bagItem.quantity);
            });
          }
          this._utility.session.character.removeBag(this.bag);
          this._utility.saveToStorage();
          this.navCtrl.pop();
        });
      }).catch(() => { });
    });
  }

  private _askMoveItems() {
    return new Promise<Bag>((resolve, reject) => {
      if (this.bag.items.length > 0) {
        this._utility.translate(["SpostamentoOggetti", "SpostareOggetti?"]).subscribe(values => {
          let title = values["SpostamentoOggetti"];
          let message = values["SpostareOggetti?"];
          this._askConfirmation(title, message).then(() => {
            this._selectBag().then(bag => {
              resolve(bag);
            }).catch(() => { });
          }).catch(() => { resolve(null) });
        });
      } else
        resolve(null);
    });
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Bag } from "../../model/bag";
import { JsonObject } from "../../model/json-model";
import { UtilityProvider } from "../../providers/utility/utility";

@IonicPage()
@Component({
  selector: 'page-bag-details',
  templateUrl: 'bag-details.html',
})
export class BagDetailsPage {
  public bag: Bag = new Bag();
  public name: string;
  public weight: string;
  public isFixedWeight: boolean;
  public capacity: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _utility: UtilityProvider,
    private _alertCtrl: AlertController,
  ) {
    if (navParams.data.bag) {
      this.bag = navParams.data.bag;
      this.name = this.bag.name;
      this.weight = this.bag.weight.toString();
      this.isFixedWeight = this.bag.isFixedWeight;
      this.capacity = this.bag.capacity.toString();
    }
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
      this._alertCtrl.create({
        title: values["ButtareBorsa"],
        message: values["ButtareBorsa?"],
        buttons: [
          {
            text: values["No"]
          },
          {
            text: values["Si"],
            handler: () => {
              this._utility.session.character.removeBag(this.bag);
              this._utility.saveToStorage();
              this.navCtrl.pop();
            }
          }
        ]
      }).present();
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

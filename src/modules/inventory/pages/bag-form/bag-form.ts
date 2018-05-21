import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';
import { InventoryProvider } from '../../inventory.provider';
import { Bag } from '../../model/bag.model';

@IonicPage()
@Component({
  selector: 'page-bag-form',
  templateUrl: 'bag-form.html',
})
export class BagFormPage {
  private _id: number;
  private _form: FormGroup;

  headerLogo: string;
  headerTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _formBuilder: FormBuilder,
    private _inventory: InventoryProvider,
    private _utility: UtilityProvider,
    private _interface: InterfaceProvider,
  ) {
    this._form = this._formBuilder.group({
      name: ["", Validators.required],
      bagWeight: [0, Validators.required],
      hasLimitedCapacity: [false, Validators.required],
      capacity: [0, Validators.required],
    });

    this.headerLogo = this._utility.images.inventory.logo;
    this.headerTitle = "DettagliBorsa";

    this._id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    if (this._id !== undefined) {
      let bag = this._inventory.selectBag(this._id);
      this._form.reset({
        name: bag.name,
        bagWeight: bag.bagWeight,
        hasLimitedCapacity: bag.hasLimitedCapacity,
        capacity: bag.capacity,
      });
    }
  }

  save() {
    this._interface.showLoader({
      content: "Salvataggio",
    }).then(() => {
      let model = this._form.value;
      let bag = new Bag();
      Object.assign(bag, model);
      //Il modello della form restituisce sempre delle stringhe dai campi di input
      this._utility.castNumberProps(bag, ["bagWeight", "capacity"]);
      if (this._id !== undefined)
        return this._inventory.updateBag(this._id, bag);
      else
        return this._inventory.insertBag(bag);
    }).then(() => {
      return this.viewCtrl.dismiss({ action: "save" });
    }).then(() => {
      return this._interface.hideLoader();
    }).catch(error => {
      this._interface.showAndLogError(error);
    });
  }

  cancel() {
    this.viewCtrl.dismiss({ action: "cancel" });
  }

  delete() {
    this._interface.askConfirmation({
      title: "CancellazioneBorsa",
      message: "CancellazioneBorsa?",
      interpolateParams: {
        bagName: this._form.value.name,
      }
    }).then(isConfirmed => {
      if (!isConfirmed)
        throw new console.error("ConfermaUtente");

      return this._interface.showLoader({
        content: "Salvataggio",
      });
    }).then(() => {
      return this._inventory.deleteBag(this._id);
    }).then(() => {
      return this.viewCtrl.dismiss({ action: "delete" });
    }).then(() => {
      return this._interface.hideLoader();
    }).catch(error => {
      this._interface.showAndLogError(error);
    });
  }
}

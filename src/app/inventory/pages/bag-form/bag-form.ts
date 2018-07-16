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
  private _bag: Bag;

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
      ignoreItemsWeight: [false, Validators.required],
    });

    this.headerLogo = this._utility.images.inventory.logo;
    this.headerTitle = "DettagliBorsa";

    this._id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    if (this._id !== undefined) {
      this._inventory.getBagFromSession(this._id).then(bag => {
        this._bag = bag;
        this._form.reset({
          name: bag.name,
          bagWeight: bag.bagWeight,
          hasLimitedCapacity: bag.hasLimitedCapacity,
          capacity: bag.capacity,
          ignoreItemsWeight: bag.ignoreItemsWeight,
        });
      });
    }
  }

  save() {
    this._interface.showLoader({
      content: "Salvataggio",
    }).then(() => {
      let model = this._form.value;
      let bag = this._bag;
      if (!bag) {
        bag = this._inventory.createBagFromSession();
      }
      Object.assign(bag, model);
      //Il modello della form restituisce sempre delle stringhe dai campi di input
      this._utility.castNumberProps(bag, ["bagWeight", "capacity"]);
      return bag.save();
    }).then(() => {
      return this.viewCtrl.dismiss();
    }).then(() => {
      return this._interface.hideLoader();
    }).catch(error => {
      this._interface.showAndLogError(error);
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
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
        throw new Error("ConfermaUtente");

      return this._interface.showLoader({
        content: "Salvataggio",
      });
    }).then(() => {
      return this._inventory.deleteBagFromSession(this._id);
    }).then(() => {
      return this.viewCtrl.dismiss();
    }).then(() => {
      return this._interface.hideLoader();
    }).catch(error => {
      this._interface.showAndLogError(error);
    });
  }
}

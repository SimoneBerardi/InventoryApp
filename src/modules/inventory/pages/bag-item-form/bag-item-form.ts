import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';
import { InventoryProvider } from '../../inventory.provider';
import { BagItem } from '../../model/bag-item.model';

@IonicPage()
@Component({
  selector: 'page-bag-item-form',
  templateUrl: 'bag-item-form.html',
})
export class BagItemFormPage {
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
      description: ["", Validators.required],
      itemWeight: [0, Validators.required],
      quantity: [0, Validators.required],
    });

    this.headerLogo = this._utility.images.inventory.logo;
    this.headerTitle = "DettagliOggetto";

    this._id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    if (this._id !== undefined) {
      let bagItem = this._inventory.selectBagItem(this._id);
      this._form.reset({
        name: bagItem.name,
        description: bagItem.description,
        itemWeight: bagItem.itemWeight,
        quantity: bagItem.quantity,
      });
    }
  }

  save() {
    this._interface.showLoader({
      content: "Salvataggio",
    }).then(() => {
      let model = this._form.value;
      let bagItem = new BagItem();
      Object.assign(bagItem, model);
      //Il modello della form restituisce sempre delle stringhe dai campi di input
      this._utility.castNumberProps(bagItem, ["itemWeight", "quantity"]);
      if (this._id !== undefined)
        return this._inventory.updateBagItem(this._id, bagItem);
    }).then(() => {
      return this.viewCtrl.dismiss({ action: "save" }).then(() => {
        this._interface.hideLoader();
      });
    });
  }

  cancel() {
    this.viewCtrl.dismiss({ action: "cancel" });
  }
}

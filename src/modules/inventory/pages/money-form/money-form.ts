import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';
import { Money } from '../../model/money.model';
import { InventoryProvider } from '../../inventory.provider';

@IonicPage()
@Component({
  selector: 'page-money-form',
  templateUrl: 'money-form.html',
})
export class MoneyFormPage {
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
      platinum: [0, Validators.required],
      gold: [0, Validators.required],
      electrum: [0, Validators.required],
      silver: [0, Validators.required],
      copper: [0, Validators.required],
    });

    this.headerLogo = this._utility.images.inventory.logo;
    this.headerTitle = "DettagliMonete";

    this._id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    if (this._id !== undefined) {
      let money = this._inventory.selectMoney(this._id);
      this._form.reset({
        copper: money.copper,
        silver: money.silver,
        electrum: money.electrum,
        gold: money.gold,
        platinum: money.platinum,
      });
    }
  }

  save() {
    this._interface.showLoader({
      content: "Salvataggio",
    }).then(() => {
      let model = this._form.value;
      let newMoney = new Money();
      Object.assign(newMoney, model);
      //Il modello della form restituisce sempre delle stringhe dai campi di input
      this._utility.castNumberProps(newMoney, ["platinum", "electrum", "gold", "silver", "copper"]);
      if (this._id !== undefined)
        return this._inventory.updateMoney(this._id, newMoney);
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

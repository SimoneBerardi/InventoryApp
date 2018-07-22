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
  private _money: Money;

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
      ignoreWeight: [false, Validators.required],
    });

    this.headerLogo = this._utility.images.inventory.logo;
    this.headerTitle = "DettagliMonete";

    this._id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    if (this._id !== undefined) {
      this._inventory.getMoneyFromSession().then(money => {
        this._money = money;
        this._form.reset({
          copper: money.copper,
          silver: money.silver,
          electrum: money.electrum,
          gold: money.gold,
          platinum: money.platinum,
          ignoreWeight: money.ignoreWeight || false,
        });
      });
    }
  }

  save() {
    this._interface.showLoader({
      content: "Salvataggio",
    }).then(() => {
      let model = this._form.value;
      let money = this._money;

      Object.assign(money, model);
      //Il modello della form restituisce sempre delle stringhe dai campi di input
      this._utility.castNumberProps(money, ["platinum", "electrum", "gold", "silver", "copper"]);
      return money.save();
    }).then(() => {
      return this.viewCtrl.dismiss().then(() => {
        this._interface.hideLoader();
      });
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}

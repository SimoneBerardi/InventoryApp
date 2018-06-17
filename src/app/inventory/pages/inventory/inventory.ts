import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { Inventory } from '../../model/inventory.model';
import { InventoryProvider } from '../../inventory.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';
import { Bag } from '../../model/bag.model';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {
  headerLogo: string;
  headerTitle: string;

  isLoading: boolean;
  inventory: Inventory;
  selectedId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _inventory: InventoryProvider,
    private _utility: UtilityProvider,
    private _interface: InterfaceProvider,
  ) {
    this.headerLogo = this._utility.images.inventory.logo;
    this.headerTitle = "Inventario";
  }

  ionViewDidLoad() {
    this._inventory.getFromSession().then(inventory => {
      this.inventory = inventory;
      this.isLoading = false;
    });
  }

  get bags() {
    return this.inventory.bags;
  }

  moneyClick() {
    this._interface.showModal("MoneyFormPage", { id: this.inventory.money.id });
  }
  select(id: number) {
    this._interface.showModal("BagItemActionsPage", { id: id });
  }

  addBag() {
    this._interface.showModal("BagFormPage");
  }
  modifyBag(bag: Bag) {
    if (!bag.isProtected)
      this._interface.showModal("BagFormPage", { id: bag.id });
  }
}

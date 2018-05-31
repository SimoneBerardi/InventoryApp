import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OptionsProvider } from '../../../shared/providers/options.provider';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { Inventory } from '../../model/inventory.model';
import { InventoryProvider } from '../../inventory.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';
import { MoveEventData } from '../../components/bag-item-list/bag-item-list';
import { Bag } from '../../model/bag.model';
import { InventoryInterfaceProvider } from '../../inventory-interface.provider';

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
    private _options: OptionsProvider,
    private _utility: UtilityProvider,
    private _interface: InterfaceProvider,
    private _inventoryInterface: InventoryInterfaceProvider,
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

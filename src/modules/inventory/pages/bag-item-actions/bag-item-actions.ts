import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { InventoryProvider } from '../../inventory.provider';
import { BagItem } from '../../model/bag-item.model';
import { OptionsProvider } from '../../../shared/providers/options.provider';
import { InventoryInterfaceProvider } from '../../inventory-interface.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';

@IonicPage()
@Component({
  selector: 'page-bag-item-actions',
  templateUrl: 'bag-item-actions.html',
})
export class BagItemActionsPage {
  private _id: number;
  private _bagItem: BagItem;

  headerLogo: string;
  headerTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _inventory: InventoryProvider,
    private _utility: UtilityProvider,
    private _options: OptionsProvider,
    private _inventoryInterface: InventoryInterfaceProvider,
    private _interface: InterfaceProvider,
  ) {

    this.headerLogo = this._utility.images.inventory.logo;
    this.headerTitle = "Inventario";

    this._id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    if (this._id !== undefined) {
      this._inventory.selectBagItem(this._id).then(bagItem => {
        this._bagItem = bagItem;
      });
    }
  }

  get name() {
    return this._bagItem.item.name;
  }
  get quantity() {
    return this._bagItem.quantity;
  }

  get contentStyle() {
    return {
      "background-color": this._options.baseColor + "CC",
    }
  }

  add(event: Event) {
    event.stopPropagation();
    this._inventoryInterface.modifyBagItemQuantity(this._id, 1, false);
  }
  move(event: Event) {
    event.stopPropagation();
    this._inventoryInterface.moveBagItemQuantity(this._id, this._bagItem.quantity).then(() => {
      this.viewCtrl.dismiss();
    });
  }
  remove(event: Event) {
    event.stopPropagation();
    this._inventoryInterface.modifyBagItemQuantity(this._id, 1, true).then(() => {
      if (this._bagItem.quantity === 0)
        this.viewCtrl.dismiss();
    });
  }
  modify(event: Event) {
    event.stopPropagation();
    this.viewCtrl.dismiss().then(() => {
      this._interface.showModal("ItemFormPage", { id: this._bagItem.item.id });
    });
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
}

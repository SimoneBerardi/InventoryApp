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

  wheelImage: string;

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

    this.wheelImage = this._utility.images.inventory.wheel_back;

    this._id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    if (this._id !== undefined) {
      this._inventory.getBagItemFromSession(this._id).then(bagItem => {
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

  add(event: Event) {
    event.stopPropagation();
    this._inventoryInterface.modifyBagItemQuantity(this._bagItem, 1, false).catch(error => {
      this._interface.showAndLogError(error);
    });
  }
  move(event: Event) {
    event.stopPropagation();
    this._inventoryInterface.moveBagItemQuantity(this._bagItem).then(() => {
      this.viewCtrl.dismiss();
    }).catch(error => {
      this._interface.showAndLogError(error);
    });
  }
  remove(event: Event) {
    event.stopPropagation();
    this._inventoryInterface.modifyBagItemQuantity(this._bagItem, 1, true).then(() => {
      if (this._bagItem.quantity === 0)
        this.viewCtrl.dismiss();
    }).catch(error => {
      this._interface.showAndLogError(error);
    });
  }
  modify(event: Event) {
    event.stopPropagation();
    this.viewCtrl.dismiss().then(() => {
      this._interface.showModal("ItemFormPage", { id: this._bagItem.item.id });
    }).catch(error => {
      this._interface.showAndLogError(error);
    });
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
}

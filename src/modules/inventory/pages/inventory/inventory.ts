import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OptionsProvider } from '../../../shared/providers/options.provider';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { Inventory } from '../../model/inventory.model';
import { InventoryProvider } from '../../inventory.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';
import { MoveEventData } from '../../components/bag-item-list/bag-item-list';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _inventory: InventoryProvider,
    private _options: OptionsProvider,
    private _utility: UtilityProvider,
    private _interface: InterfaceProvider,
  ) {
    this.headerLogo = this._utility.images.inventory.logo;
    this.headerTitle = "Inventario";
  }

  ionViewDidLoad() {
    this.inventory = this._inventory.inventory;
    this.isLoading = false;
  }

  // get equippedItems() {
  //   return this.inventory.equipped;
  // }
  // get equippedWeight() {
  //   return this._utility.roundUp(this.inventory.equippedWeight);
  // }
  get bags() {
    return this.inventory.bags;
  }

  moneyClick() {
    this._interface.showModal("MoneyFormPage", { id: this.inventory.money.id });
  }

  addBag() {
    this._interface.showModal("BagFormPage");
  }

  add(id: number) {
    this._inventory.modifyBagItemQuantity(id, 1, false);
  }

  remove(id: number) {
    Promise.resolve().then(() => {
      let bagItem = this._inventory.selectBagItem(id);
      if (bagItem.quantity === 1)
        return this._interface.askConfirmation({
          title: "ButtareOggetto",
          message: "ButtareOggetto?",
          interpolateParams: {
            bagItemName: bagItem.name,
          }
        });
      else
        return Promise.resolve(true);
    }).then(isConfirmed => {
      if (isConfirmed)
        return this._inventory.modifyBagItemQuantity(id, 1, true);
      else
        return Promise.resolve();
    });
  }

  modify(id: number) {
    this._interface.showModal("BagItemFormPage", { id: id });
  }

  move(data: MoveEventData) {
    console.log("TODO - move: " + data);
    // let bagItem = this._inventory.selectBagItem(data.id);
    // if (data.isQuickAction) {
    //   let bagId = bagItem.isEquipped ? this.inventory.bags[0].id : -1;
    //   return this._inventory.moveBagItem(data.id, bagId);
    // } else {
    //   //TODO chiedi borsa in cui spostare
    // }
  }
}

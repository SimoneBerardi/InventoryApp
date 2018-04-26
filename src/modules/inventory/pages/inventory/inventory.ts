import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OptionsProvider } from '../../../shared/providers/options.provider';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { Inventory } from '../../model/inventory.model';
import { InventoryProvider } from '../../inventory.provider';
import { SessionProvider } from '../../../shared/providers/session.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';

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
    private _session: SessionProvider,
    private _options: OptionsProvider,
    private _utility: UtilityProvider,
    private _interface: InterfaceProvider,
  ) {
    this.headerLogo = this._utility.images.logos.inventory;
    this.headerTitle = "Inventario";
  }

  ionViewDidLoad() {
    //DEBUG
    this._inventory.loadTestItems();

    this._inventory.loadInventory(this._session.characterId);
    this.inventory = this._inventory.inventory;
    this.isLoading = false;
  }

  get bags() {
    return this.inventory.bags;
  }

  moneyClick() {
    this._interface.showModal("MoneyFormPage", { id: this.inventory.money.id });
  }
}

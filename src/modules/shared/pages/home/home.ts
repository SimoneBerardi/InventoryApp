import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  charsListTab = "CharacterListPage";
  charTab = "CharacterInfoPage";
  inventoryTab = "InventoryPage";
  itemsTab = "ItemListPage";

  charsListParams = {
    skipLoading: true,
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _events: Events,
  ) {
    this._events.unsubscribe("exit");
    this._events.subscribe("exit", () => {
      this.exit();
    });
  }

  exit() {
    this.navCtrl.popToRoot();
  }

}
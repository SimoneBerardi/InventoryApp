import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  ) { }

  exit() {
    this.navCtrl.popToRoot();
  }

}

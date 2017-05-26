import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from "../../providers/utility/utility";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public charTab = "CharacterDetailsPage";
  public inventoryTab = "InventoryPage";
  public root = "CharactersListPage";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _utility: UtilityProvider) {
  }

}

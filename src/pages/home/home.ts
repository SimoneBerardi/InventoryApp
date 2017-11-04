import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  charTab = "CharacterDetailsPage";
  inventoryTab = "InventoryPage";
  itemsTab = "ItemsPage";
  root = "CharactersListPage";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _events: Events,
  ) {
    this._events.unsubscribe("character-details:exit");
    this._events.subscribe("character-details:exit", () => {
      this.navCtrl.popToRoot();
    });
  }

}

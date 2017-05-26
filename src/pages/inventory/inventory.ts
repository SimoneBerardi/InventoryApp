import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Bag } from "../../model/bag";
import { UtilityProvider } from "../../providers/utility/utility";

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage implements OnInit {
  public bags: Bag[] = new Array<Bag>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _utility: UtilityProvider,
  ) {
  }

  ngOnInit() {
    this.bags = this._utility.session.character.bags;
  }

}

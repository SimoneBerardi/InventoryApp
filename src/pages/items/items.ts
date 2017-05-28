import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from "../../model/item";
import { UtilityProvider } from "../../providers/utility/utility";

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage implements OnInit {
  public items: Item[] = new Array<Item>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _utility: UtilityProvider) {
  }

  ngOnInit() {
    this.items = this._utility.items;
  }

}

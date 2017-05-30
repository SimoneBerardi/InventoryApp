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
  public itemsType = "weapons";
  public items: Item[] = new Array<Item>();
  public weapons: Item[] = new Array<Item>();
  public armors: Item[] = new Array<Item>();
  public simpleItems: Item[] = new Array<Item>();

  public isSearching: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _utility: UtilityProvider) {
  }

  ngOnInit() {
    this.items = this._utility.items;
    this.weapons = this._utility.weaponItems;
    this.armors = this._utility.armorItems;
    this.simpleItems = this._utility.simpleItems;
  }

  public getItems(event: any) {
    this.items = this._utility.items;
    let value = event.target.value as string;
    if (value && value.trim() != '' && value.length >= 3) {
      this.isSearching = true;
      this.items = this.items.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    } else
      this.isSearching = false;
  }

}

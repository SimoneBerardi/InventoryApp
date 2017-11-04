import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from "../../model/item";
import { ItemsListProvider } from '../../providers/items-list/items-list';
import { InterfaceProvider } from '../../providers/interface/interface';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage implements OnInit {
  itemsType = "weapons";
  items: Item[] = new Array<Item>();
  weapons: Item[] = new Array<Item>();
  armors: Item[] = new Array<Item>();
  simpleItems: Item[] = new Array<Item>();

  isSearching: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _items: ItemsListProvider,
    private _interface: InterfaceProvider,
    private _session: SessionProvider,
  ) {
  }

  ngOnInit() {
    this.items = this._items.items;
    this.weapons = this._items.weaponItems;
    this.armors = this._items.armorItems;
    this.simpleItems = this._items.simpleItems;
  }

  getItems(event: any) {
    this.items = this._items.items;
    let value = event.target.value as string;
    if (value && value.trim() != '' && value.length >= 3) {
      this.isSearching = true;
      this.items = this.items.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    } else
      this.isSearching = false;
  }

  addItem(item: Item) {
    this._interface.selectQuantity().then(quantity => {
      this._interface.selectBag(this._session.character).then(bag => {
        bag.addItem(item, quantity);
        this._session.saveCharacter();
      }).catch(() => { });
    }).catch(() => { });;
  }
  add() {
    this.navCtrl.push("ItemDetailsPage");
  }
  modifyItem(item: Item) {
    this.navCtrl.push("ItemDetailsPage", { item: item });
  }

}

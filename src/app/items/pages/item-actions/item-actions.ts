import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';
import { Item } from '../../item.model';
import { ItemProvider } from '../../item.provider';

@IonicPage()
@Component({
  selector: 'page-item-actions',
  templateUrl: 'item-actions.html',
})
export class ItemActionsPage {
  private _id: number;
  private _item: Item;

  headerLogo: string;
  headerTitle: string;

  wheelImage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _utility: UtilityProvider,
    private _interface: InterfaceProvider,
    private _items: ItemProvider,
    private _events: Events,
  ) {

    this.headerLogo = this._utility.images.inventory.logo;
    this.headerTitle = "PiazzaMercato";

    this.wheelImage = this._utility.images.shared.wheel.back;

    this._id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    if (this._id !== undefined) {
      this._items.getById(this._id).then(bagItem => {
        this._item = bagItem;
      });
    }
  }

  get name() {
    return this._item.name;
  }
  get totalQuantity() {
    return this._item.totalQuantity;
  }
  get defaultBagName() {
    return this._utility.session.defaultBagName;
  }
  get addImage() {
    return this._utility.images.shared.wheel.add;
  }
  get removeImage() {
    return this._utility.images.shared.wheel.remove;
  }
  get editImage() {
    return this._utility.images.shared.wheel.edit;
  }
  get faveImage() {
    return this._item.isFavorite ? this._utility.images.shared.wheel.fave : this._utility.images.shared.wheel.notFave;
  }

  add(event: Event) {
    event.stopPropagation();
    this._items.addItemToInventory(this._item, 1);
  }
  favorite(event: Event) {
    event.stopPropagation();
    this._item.isFavorite = !this._item.isFavorite;
    this._items.modify(this._id, this._item);
  }
  remove(event: Event) {
    event.stopPropagation();
    this._items.removeItemFromInventory(this._item, -1);
  }
  modify(event: Event) {
    event.stopPropagation();
    this.viewCtrl.dismiss().then(() => {
      this._interface.showModal("ItemFormPage", { id: this._id });
    });
  }
  selectBag(event: Event) {
    event.stopPropagation();
    this._events.publish("Item:changeBag");
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
}

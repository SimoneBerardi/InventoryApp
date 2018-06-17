import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../item.provider';
import { Item } from '../../item.model';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { ItemGroup } from '../../item-group.model';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';

@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {
  headerLogo: string;
  headerTitle: string;

  isLoading: boolean = true;
  isSearching: boolean = false;

  groups: ItemGroup[] = [];
  searchItems: Item[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _items: ItemProvider,
    private _utility: UtilityProvider,
    private _interface: InterfaceProvider,
  ) {
    this.headerLogo = this._utility.images.logos.items;
    this.headerTitle = "PiazzaMercato";
  }

  ionViewDidLoad() {
    this._items.getGroupedByCategory().then(groups => {
      this.groups = groups;
      this.isLoading = false;
    });
  }

  add() {
    this._interface.showModal("ItemFormPage");
  }

  select(id: number) {
    this._interface.showModal("ItemActionsPage", { id: id })
    // this._items.addItem({ id: id });
    // console.log("TODO - Aggiunta elemento")
  }

  press(id: number) {
    this._interface.showActionSheet({
      title: "Azioni",
      buttons: [
        {
          text: "AggiungiQuantità",
          handler: () => {
            console.log("TODO - Aggiunta elemento con quantità")
          }
        },
        {
          text: "Modifica",
          handler: () => {
            this._interface.showModal("ItemFormPage", { id: id });
          }
        }
      ]
    })
  }

  search(value: string) {
    this.isSearching = value !== "";
    if (this.isSearching)
      this._items.getBySearch(value).then(items => {
        this.searchItems = items;
        this.isLoading = false;
      });
    else
      this.isLoading = false;
  }
}

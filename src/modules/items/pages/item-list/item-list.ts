import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../item.provider';
import { Item, ItemCategory } from '../../item.model';
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
  groups: ItemGroup[] = [];

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
    this._generateGroups();
    this.isLoading = false;
  }

  add() {
    this._interface.showModal("ItemFormPage").then((data: any) => {
      if (data.action == "save" || data.action == "delete")
        this._generateGroups();
    });
  }

  select(id: number) {
    this._items.selectItem({ id: id });
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
            this._interface.showModal("ItemFormPage", { id: id }).then((data: any) => {
              if (data.action == "save" || data.action == "delete")
                this._generateGroups();
            });
          }
        }
      ]
    })
  }

  private _generateGroups() {
    let groups = [];
    this._utility.enumerateEnum(ItemCategory).forEach(category => {
      let group = new ItemGroup();
      group.name = category.value;
      group.items = this._items.characterItems.filter(item => item.category === category.key)
      let oldGroup = this.groups.find(o => o.name === group.name);
      if (oldGroup)
        group.isOpen = oldGroup.isOpen;
      if (group.items.length > 0)
        groups.push(group);
    });
    this.groups = groups;
  }
}

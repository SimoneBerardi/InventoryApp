import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from "../../model/item";
import { InterfaceProvider } from '../../providers/interface/interface';
import { ItemsListProvider } from '../../providers/items-list/items-list';
import { SessionProvider } from '../../providers/session/session';
import { TranslateProvider } from '../../providers/translate/translate';

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  item: Item;
  name: string;
  description: string;
  weight: number;
  tags: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _interface: InterfaceProvider,
    private _items: ItemsListProvider,
    private _session: SessionProvider,
    private _translate: TranslateProvider,
  ) {
    if (navParams.data.item) {
      this.item = navParams.data.item;
      this.name = this.item.name;
      this.description = this.item.description;
      this.weight = this.item.weight;
      this.tags = this.item.tags;
    }
  }

  cancel() {
    this.navCtrl.pop();
  }
  save() {
    if (!this.name || this.name == "") {
      this._interface.showAlertLanguage("Attenzione", "InserisciNomeValido");
    } else {
      if (!this.item) {
        this.item = new Item();
        this.item.isCustom = true;
        this._validate(this.item);
        this._items.add(this.item);
      } else
        this._validate(this.item);
      this._session.saveCharacter();
      this.navCtrl.pop();
    }
  }
  delete() {
    return this._translate.translate(["CancellazioneOggetto", "CancellareOggetto?"]).then(values => {
      let title = values["CancellazioneOggetto"];
      let message = values["CancellareOggetto?"];
      return this._interface.askConfirmation(title, message);
    }).then(isConfirmed => {
      if (isConfirmed) {
        return this._items.remove(this.item).then(() => {
          this.navCtrl.pop();
        });
      } else
        return Promise.resolve();
    }).catch(() =>{});
  }

  private _validate(item: Item) {
    item.name = this.name;
    item.description = this.description;
    if (this.weight != undefined)
      item.weight = this.weight;
    else
      item.weight = 0;
    item.tags = "items";
  }

}
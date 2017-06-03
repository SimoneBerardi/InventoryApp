import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Item } from "../../model/item";
import { UtilityProvider } from "../../providers/utility/utility";
import { CustomComponent } from "../../model/interface";

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage extends CustomComponent {
  public item: Item;
  public name: string;
  public description: string;
  public weight: number;
  public tags: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    _utility: UtilityProvider,
    _alertCtrl: AlertController,
  ) {
    super(_utility, _alertCtrl);
    if (navParams.data.item) {
      this.item = navParams.data.item;
      this.name = this.item.name;
      this.description = this.item.description;
      this.weight = this.item.weight;
      this.tags = this.item.tags;
    }
  }

  public cancel() {
    this.navCtrl.pop();
  }
  public save() {
    if (!this.name || this.name == "") {
      this.showAlertLanguage("Attenzione", "InserisciNomeValido");
    } else {
      if (!this.item) {
        this.item = new Item(true);
        this._validate(this.item);
        this._utility.addItem(this.item);
      } else
        this._validate(this.item);
      this._utility.sortItems();
      this._utility.saveToStorage();
      this.navCtrl.pop();
    }
  }
  public delete() {
    this._utility.translate(["CancellazioneOggetto", "CancellareOggetto?"]).subscribe(values => {
      let title = values["CancellazioneOggetto"];
      let message = values["CancellareOggetto?"];
      this._askConfirmation(title, message).then(() => {
        this._utility.removeItem(this.item);
        this._utility.sortItems();
        this._utility.saveToStorage();
        this.navCtrl.pop();
      }).catch(() => { })
    });
  }

  private _validate(item: Item) {
    item.name = this.name;
    item.description = this.description;
    item.weight = this.weight;
    item.tags = "items";
  }

}
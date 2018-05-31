import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemProvider } from '../../item.provider';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';
import { Item, ItemCategory } from '../../item.model';

@IonicPage()
@Component({
  selector: 'page-item-form',
  templateUrl: 'item-form.html',
})
export class ItemFormPage {
  private _id: number;
  private _form: FormGroup;
  private _item: Item;

  headerLogo: string;
  headerTitle: string;

  categories: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _formBuilder: FormBuilder,
    private _items: ItemProvider,
    private _utility: UtilityProvider,
    private _interface: InterfaceProvider,
  ) {
    this._form = this._formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      weight: [0, Validators.required],
      category: [0, Validators.required],
    });

    this.headerLogo = this._utility.images.logos.items;
    this.headerTitle = "DettagliOggetto";

    this._id = this.navParams.get("id");
    this.categories = this._utility.enumerateEnum(ItemCategory);
  }

  ionViewDidLoad() {
    if (this._id !== undefined) {
      this._items.getById(this._id).then(item => {
        this._item = item;
        this._form.reset({
          name: item.name,
          description: item.description,
          weight: item.weight,
          category: item.category,
        });
      });
    }
  }

  save() {
    this._interface.showLoader({
      content: "Salvataggio",
    }).then(() => {
      let model = this._form.value;
      let item = this._item;
      if (!item)
        item = this._items.create();

      Object.assign(item, model);
      this._utility.castNumberProps(item, ["weight"]);
      item.save();
    }).then(() => {
      return this.viewCtrl.dismiss().then(() => {
        this._interface.hideLoader();
      });
    }).catch(error => {
      this._interface.showAndLogError(error);
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  delete() {
    this._interface.askConfirmation({
      title: "CancellazioneOggetto",
      message: "CancellareOggetto?",
      interpolateParams: {
        itemName: this._form.value.name,
      }
    }).then(isConfirmed => {
      if (!isConfirmed)
        throw new Error("ConfermaUtente");

      return this._interface.showLoader({
        content: "Salvataggio",
      });
    }).then(() => {
      return this._items.delete(this._id);
    }).then(() => {
      return this.viewCtrl.dismiss();
    }).then(() => {
      return this._interface.hideLoader();
    }).catch(error => {
      this._interface.showAndLogError(error);
    });
  }
}

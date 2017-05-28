import { Component, Input } from '@angular/core';
import { BagItem } from "../../model/bag-item";
import { UtilityProvider } from "../../providers/utility/utility";
import { AlertController } from "ionic-angular";
import { Bag } from "../../model/bag";

@Component({
  selector: 'bag-item',
  templateUrl: 'bag-item.html'
})
export class BagItemComponent {
  @Input() bag: Bag;
  @Input() bagItem: BagItem;
  @Input() isEquipped: boolean;
  @Input() isSelected: boolean;
  private _showOptions: boolean;

  constructor(
    private _utility: UtilityProvider,
    private _alertCtrl: AlertController,
  ) {
  }

  public get text() {
    return this.bagItem.text;
  }
  public get weight() {
    return this.bagItem.weight;
  }
  public get showOptions() {
    return this._showOptions && this._utility.session.selectedBagItem == this.bagItem;
  }

  public toggleOptions() {
    if (this._showOptions && this._utility.session.selectedBagItem != this.bagItem)
      this._showOptions = false;
    this._utility.session.selectedBagItem = this.bagItem;
    this._showOptions = !this._showOptions;
  }
  public add() {
    this.bagItem.quantity++;
  }
  public remove() {
    if (this.bagItem.quantity == 1) {
      this._utility.translate(["ButtareOggetto", "ButtareOggetto?", "Si", "No"]).subscribe(values => {
        this._alertCtrl.create({
          title: values["ButtareOggetto"],
          message: values["ButtareOggetto?"],
          buttons: [
            {
              text: values["No"]
            },
            {
              text: values["Si"],
              handler: () => {
                this.bag.removeItem(this.bagItem);
                this._utility.saveToStorage();
              }
            }
          ]
        }).present();
      });
    } else
      this.bagItem.quantity--;
  }
  public equip() {
    this.bag.removeItem(this.bagItem);
    this._utility.session.character.equipItem(this.bagItem);
    this._utility.saveToStorage();
  }
  public unequip() {
    this._selectQuantity().then(quantity => {
      this._selectBag().then(bag => {
        this.bag.removeItem(this.bagItem, quantity);
        bag.addItem(this.bagItem.item, quantity);
        this._utility.saveToStorage();
      }).catch(() => { });
    }).catch(() => { });
  }

  private _selectQuantity() {
    return new Promise<number>((resolve, reject) => {
      if (this.bagItem.quantity == 1)
        resolve(1);
      else {
        this._utility.translate(["SelezionaQuantita", "Quanti?", "Ok", "Annulla"]).subscribe(values => {
          this._alertCtrl.create({
            title: values["SelezionaQuantita"],
            message: values["Quanti?"],
            inputs: [
              {
                type: "number",
                name: "quantity",
                value: "1",
                min: 1,
                max: this.bagItem.quantity
              }
            ],
            buttons: [
              {
                text: values["Annulla"],
                handler: () => {
                  reject();
                }
              },
              {
                text: values["Ok"],
                handler: data => {
                  let selectedQuantity = parseFloat(data.quantity);
                  let result = this.bagItem.quantity;
                  if (selectedQuantity > 0 && selectedQuantity < result)
                    result = selectedQuantity;
                  resolve(selectedQuantity);
                }
              }
            ]
          }).present();
        })
      }
    });
  }
  private _selectBag() {
    return new Promise<Bag>((resolve, reject) => {
      if (this._utility.session.character.bags.length == 2)
        resolve(this._utility.session.character.backpack);
      else {
        this._utility.translate(["ScegliZaino", "QualeZaino?", "Conferma", "Annulla"]).subscribe(values => {
          let alert = this._alertCtrl.create({
            title: values["ScegliZaino"],
            message: values["QualeZaino?"],
            buttons: [
              {
                text: values["Annulla"],
                handler: () => {
                  console.log("Selezione borsa annullata dall'utente");
                  reject();
                }
              },
              {
                text: values["Conferma"],
                handler: data => {
                  let bag = this._utility.session.character.bags.filter(bag => bag.id == data)[0];
                  resolve(bag);
                }
              }
            ]
          });
          let bags = this._utility.session.character.bags.filter(bag => bag.id != this.bag.id);
          bags.forEach(bag => {
            alert.addInput({
              type: "radio",
              label: bag.name,
              value: bag.id.toString()
            })
          });
          alert.present();
        });
      }
    });
  }

}

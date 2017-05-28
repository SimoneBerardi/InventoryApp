import { Component, Input } from '@angular/core';
import { Item } from "../../model/item";
import { UtilityProvider } from "../../providers/utility/utility";
import { AlertController } from "ionic-angular";
import { Bag } from "../../model/bag";

@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class ItemComponent {
  @Input() item: Item;

  constructor(
    private _utility: UtilityProvider,
    private _alertCtrl: AlertController,
  ) {
  }

  public get name() {
    return this.item.name;
  }
  public get weight() {
    return this.item.weight;
  }
  public get quantity() {
    return this._utility.session.character.getItemQuantity(this.item);
  }

  public add() {
    this._selectQuantity().then(quantity => {
      this._selectBag().then(bag => {
        bag.addItem(this.item, quantity);
        this._utility.saveToStorage();
      });
    });
  }

  private _selectQuantity() {
    return new Promise<number>((resolve, reject) => {
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
                let result = 1;
                if (selectedQuantity > 0)
                  result = selectedQuantity;
                resolve(selectedQuantity);
              }
            }
          ]
        }).present();
      })
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
                text: values["Annulla"]
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
          this._utility.session.character.bags.forEach(bag => {
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

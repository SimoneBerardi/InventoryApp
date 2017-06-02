import { Component, Input } from '@angular/core';
import { BagItem } from "../../model/bag-item";
import { UtilityProvider } from "../../providers/utility/utility";
import { AlertController } from "ionic-angular";
import { Bag } from "../../model/bag";
import { CustomComponent } from "../../model/interface";

@Component({
  selector: 'bag-item',
  templateUrl: 'bag-item.html'
})
export class BagItemComponent extends CustomComponent {
  @Input() bag: Bag;
  @Input() bagItem: BagItem;
  @Input() isEquipped: boolean;
  @Input() isSelected: boolean;

  private _showOptions: boolean;
  private _timeout: any;
  private _interval: any;

  constructor(
    _utility: UtilityProvider,
    _alertCtrl: AlertController,
  ) {
    super(_utility, _alertCtrl);
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
  public get canMove() {
    return this._utility.session.character.bags.length > 2;
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
      clearTimeout(this._timeout);
      clearInterval(this._interval);
      this._utility.translate(["ButtareOggetto", "ButtareOggetto?", "Si", "No"]).subscribe(values => {
        let message = values["ButtareOggetto?"].replace("{0}", this.bagItem.item.name);
        this._alertCtrl.create({
          title: values["ButtareOggetto"],
          message: message,
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
    this._selectQuantity().then(quantity => {
      this.bag.removeItem(this.bagItem, quantity);
      this._utility.session.character.equippedBag.addItem(this.bagItem.item, quantity);
      this._utility.saveToStorage();
    });
  }
  public unequip() {
    this._selectQuantity(this.bagItem.quantity).then(quantity => {
      this._selectBag().then(bag => {
        this.bag.removeItem(this.bagItem, quantity);
        bag.addItem(this.bagItem.item, quantity);
        this._utility.saveToStorage();
      }).catch(() => { });
    }).catch(() => { });
  }
  public addContinue() {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this._interval = setInterval(() => {
        this.add();
      }, 100)
    }, 1000);
  }
  public removeContinue() {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this._interval = setInterval(() => {
        this.remove();
      }, 100)
    }, 1000);
  }
  public stop(event: Event) {
    clearTimeout(this._timeout)
    clearInterval(this._interval);
    if (this._interval != null) {
      event.stopPropagation();
      this._interval = null
    }
  }

}

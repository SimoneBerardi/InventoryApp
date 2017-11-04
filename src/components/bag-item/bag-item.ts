import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BagItem } from "../../model/bag-item";
import { AlertController } from "ionic-angular";
import { Bag } from "../../model/bag";
import { SessionProvider } from '../../providers/session/session';
import { InterfaceProvider } from '../../providers/interface/interface';
import { TranslateProvider } from '../../providers/translate/translate';

@Component({
  selector: 'bag-item',
  templateUrl: 'bag-item.html'
})
export class BagItemComponent {
  @Input() bag: Bag;
  @Input() bagItem: BagItem;
  @Input() isEquipped: boolean;
  @Input() isSelected: boolean;
  @Input() selectedItem: BagItem;

  @Output() selectItem: EventEmitter<BagItem> = new EventEmitter();

  private _showOptions: boolean;
  private _timeout: any;
  private _interval: any;

  constructor(
    private _alertCtrl: AlertController,
    private _session: SessionProvider,
    private _interface: InterfaceProvider,
    private _translate: TranslateProvider,
  ) {
  }

  get text() {
    return this.bagItem.text;
  }
  get weight() {
    return this.bagItem.weight;
  }
  get showOptions() {
    return this._showOptions && this.selectedItem == this.bagItem;
  }
  get canMove() {
    return this._session.character.bags.length > 2;
  }
  get description() {
    return this.bagItem.item.description;
  }

  toggleOptions() {
    if (this._showOptions && this.selectedItem != this.bagItem)
      this._showOptions = false;
    this.selectItem.emit(this.bagItem);
    this._showOptions = !this._showOptions;
  }
  add() {
    this.bagItem.quantity++;
  }
  remove() {
    if (this.bagItem.quantity == 1) {
      clearTimeout(this._timeout);
      clearInterval(this._interval);
      this._translate.translate(["ButtareOggetto", "ButtareOggetto?", "Si", "No"]).then(values => {
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
                this._session.saveCharacter();
              }
            }
          ]
        }).present();
      });
    } else
      this.bagItem.quantity--;
  }
  equip() {
    return this._interface.selectQuantity(this.bagItem.quantity).then(quantity => {
      this.bag.removeItem(this.bagItem, quantity);
      this._session.character.equippedBag.addItem(this.bagItem.item, quantity);
      this._session.saveCharacter();
    }).catch(() => { });
  }
  unequip() {
    this._interface.selectQuantity(this.bagItem.quantity).then(quantity => {
      this._interface.selectBag(this._session.character).then(bag => {
        this.bag.removeItem(this.bagItem, quantity);
        bag.addItem(this.bagItem.item, quantity);
        this._session.saveCharacter();
      }).catch(() => { });
    }).catch(() => { });
  }
  addContinue() {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this._interval = setInterval(() => {
        this.add();
      }, 100)
    }, 1000);
  }
  removeContinue() {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this._interval = setInterval(() => {
        this.remove();
      }, 100)
    }, 1000);
  }
  stop(event: Event) {
    clearTimeout(this._timeout)
    clearInterval(this._interval);
    if (this._interval != null) {
      event.stopPropagation();
      this._interval = null
    }
  }

}

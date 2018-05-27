import { Component } from '@angular/core';
import { InventoryProvider } from '../../inventory.provider';
import { CharacterProvider } from '../../../characters/character.provider';
import { Character } from '../../../characters/character.model';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { Inventory } from '../../model/inventory.model';

@Component({
  selector: 'inventory-bar',
  templateUrl: 'inventory-bar.html'
})
export class InventoryBarComponent {
  constructor(
    private _characters: CharacterProvider,
    private _inventory: InventoryProvider,
    private _utility: UtilityProvider,
  ) { 
  }

  get carriedWeight() {
    return this._inventory.inventory.carriedWeight;
  }
  get carriedWeightColor() {
    let result = "secondary";
    if (this.carriedWeight > this._utility.session.encumberedValue)
      result = "warning";
    if (this.carriedWeight > this._utility.session.heavilyEncumberedValue)
      result = "danger";
    if (this.carriedWeight > this._utility.session.maxCarryValue)
      result = "alert";
    return result;
  }
  get carriedWeightIconName() {
    let result = "checkmark-circle";
    if (this.carriedWeight > this._utility.session.encumberedValue)
      result = "warning";
    return result;
  }
  get carriedWeightClass() {
    return this._inventory.carriedWeightClass;
  }

  get iconStyle() {
    let icon = this._utility.images.inventory.status.green;
    if (this.carriedWeight > this._utility.session.encumberedValue)
      icon = this._utility.images.inventory.status.orange;
    if (this.carriedWeight > this._utility.session.heavilyEncumberedValue)
      icon = this._utility.images.inventory.status.red;
    return {
      "background-image": `url("${icon}")`
    }
  }

  // showInfo() {
  //   this._translate.translate(["Ottimo", "Attenzione", "Ok", "NotEncumberedMessage", "EncumberedMessage", "HeavilyEncumberedMessage", "MaxCarryMessage"]).then(values => {
  //     let message = values["NotEncumberedMessage"];
  //     let title = values["Ottimo"];
  //     if (this._session.character.isEncumbered) {
  //       message = values["EncumberedMessage"];
  //       title = values["Attenzione"];
  //     }
  //     if (this._session.character.isHeavilyEncumbered)
  //       message = values["HeavilyEncumberedMessage"];
  //     if (this._session.character.isOverMaxCarry)
  //       message = values["MaxCarryMessage"];
  //     this._alertCtrl.create({
  //       title: title,
  //       message: message,
  //       buttons: [
  //         {
  //           text: values["Ok"]
  //         }
  //       ]
  //     }).present();
  //   });
  // }

}

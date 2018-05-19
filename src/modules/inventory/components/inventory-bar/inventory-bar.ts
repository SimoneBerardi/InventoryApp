import { Component } from '@angular/core';
import { InventoryProvider } from '../../inventory.provider';
import { CharacterProvider } from '../../../characters/character.provider';
import { Character } from '../../../characters/character.model';
import { UtilityProvider } from '../../../shared/providers/utility.provider';

@Component({
  selector: 'inventory-bar',
  templateUrl: 'inventory-bar.html'
})
export class InventoryBarComponent {
  private _character: Character;

  constructor(
    private _characters: CharacterProvider,
    private _inventory: InventoryProvider,
    private _utility: UtilityProvider,
  ) {
    this._character = this._characters.selectedCharacter;
  }

  get carriedWeight() {
    return this._utility.roundUp(this._inventory.inventory.carriedWeight);
  }
  get carriedWeightColor() {
    let result = "secondary";
    if (this.carriedWeight > this._character.encumberedValue)
      result = "warning";
    if (this.carriedWeight > this._character.heavilyEncumberedValue)
      result = "danger";
    if (this.carriedWeight > this._character.maxCarryValue)
      result = "alert";
    return result;
  }
  get carriedWeightIconName() {
    let result = "checkmark-circle";
    if (this.carriedWeight > this._character.encumberedValue)
      result = "warning";
    return result;
  }
  get carriedWeightClass() {
    let result = "";
    if (this.carriedWeight > this._character.encumberedValue)
      result = "encumbered";
    if (this.carriedWeight > this._character.heavilyEncumberedValue)
      result = "heavily-encumbered";
    if (this.carriedWeight > this._character.maxCarryValue)
      result = "over-max-carry";
    return result;
  }

  get iconStyle() {
    let icon = this._inventory.images.status.green;
    if (this.carriedWeight > this._character.encumberedValue)
      icon = this._inventory.images.status.orange;
    if (this.carriedWeight > this._character.heavilyEncumberedValue)
      icon = this._inventory.images.status.red;
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

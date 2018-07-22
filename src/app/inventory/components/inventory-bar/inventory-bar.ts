import { Component } from '@angular/core';
import { InventoryProvider } from '../../inventory.provider';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { Inventory } from '../../model/inventory.model';

@Component({
  selector: 'inventory-bar',
  templateUrl: 'inventory-bar.html'
})
export class InventoryBarComponent {
  private _inv: Inventory;

  constructor(
    private _inventory: InventoryProvider,
    private _utility: UtilityProvider,
  ) {
    this._inventory.getFromSession().then(inventory => {
      this._inv = inventory;
    });
  }

  get carriedWeight() {
    return this._inv.carriedWeight;
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
    if (this.carriedWeight > this._utility.session.maxCarryValue)
      icon = this._utility.images.inventory.status.black;
    return {
      "background-image": `url("${icon}")`
    }
  }
}

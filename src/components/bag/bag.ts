import { Component, Input } from '@angular/core';
import { Bag } from "../../model/bag";
import { UtilityProvider } from "../../providers/utility/utility";

@Component({
  selector: 'bag',
  templateUrl: 'bag.html'
})
export class BagComponent {
  @Input() bag: Bag;

  constructor(
    private _utility: UtilityProvider,
  ) {
  }

  public get name() {
    let result = this.bag.name;
    if (this.bag.weight > 0)
      result += " (" + this.bag.weight + " Kg)";
    return result;
  }
  public get items() {
    return this.bag.items;
  }
  public get weight() {
    return this.bag.totalWeight;
  }
  public get isEquipped() {
    return this.bag.isEquipped;
  }
  public get image() {
    return this._utility.images.bag;
  }
}

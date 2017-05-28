import { Component, Input } from '@angular/core';
import { Bag } from "../../model/bag";
import { UtilityProvider } from "../../providers/utility/utility";
import { Events } from "ionic-angular";

@Component({
  selector: 'bag',
  templateUrl: 'bag.html'
})
export class BagComponent {
  @Input() bag: Bag;

  constructor(
    private _utility: UtilityProvider,
    private _events: Events,
  ) {
  }

  public get name() {
    return this.bag.name;
  }
  public get items() {
    return this.bag.items;
  }
  public get totalWeight() {
    return this.bag.totalWeight;
  }
  public get isEquipped() {
    return this.bag.isEquipped;
  }
  public get image() {
    return this._utility.images.bag;
  }
  public get isFixedWeight() {
    return this.bag.isFixedWeight;
  }
  public get isOverCapacity() {
    return this.bag.isOverCapacity;
  }
  public get fixedCapacityIconName() {
    return this.bag.isOverCapacity ? "warning" : "checkmark-circle";
  }
  public get fixedCapacityIconColor() {
    return this.bag.isOverCapacity ? "warning" : "secondary";
  }
  public get showTotal() {
    return this.bag.isFixedWeight || this.bag.totalWeight > 0;
  }
  public get showDetails() {
    return this.bag.isFixedWeight && this.bag.itemsWeight > 0;
  }
  public get fixedCapacityDetails() {
    return this.bag.itemsWeight + " / " + this.bag.capacity;
  }

  public edit() {
    this._events.publish("bag:edit", this.bag);
  }
}

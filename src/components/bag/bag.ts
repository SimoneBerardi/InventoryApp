import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bag } from "../../model/bag";
import { UtilityProvider } from "../../providers/utility/utility";
import { BagItem } from '../../model/bag-item';

@Component({
  selector: 'bag',
  templateUrl: 'bag.html'
})
export class BagComponent {
  @Input() bag: Bag;
  @Output() edit: EventEmitter<null> = new EventEmitter();

  selectedItem: BagItem;

  constructor(
    private _utility: UtilityProvider,
  ) {
  }

  get name() {
    return this.bag.name;
  }
  get items() {
    return this.bag.items;
  }
  get totalWeight() {
    return this.bag.totalWeight;
  }
  get isEquipped() {
    return this.bag.isEquipped;
  }
  get image() {
    return this._utility.images.bag;
  }
  get isFixedWeight() {
    return this.bag.isFixedWeight;
  }
  get isOverCapacity() {
    return this.bag.isOverCapacity;
  }
  get fixedCapacityIconName() {
    return this.bag.isOverCapacity ? "warning" : "checkmark-circle";
  }
  get fixedCapacityIconColor() {
    return this.bag.isOverCapacity ? "warning" : "secondary";
  }
  get showTotal() {
    return this.bag.isFixedWeight || this.bag.totalWeight > 0;
  }
  get showDetails() {
    return this.bag.isFixedWeight && this.bag.itemsWeight > 0;
  }
  get fixedCapacityDetails() {
    return this.bag.itemsWeight + " / " + this.bag.capacity;
  }

  editEvent() {
    this.edit.emit();
  }
}

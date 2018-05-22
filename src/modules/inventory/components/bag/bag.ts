import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { Bag } from '../../model/bag.model';
import { MoveEventData } from '../bag-item-list/bag-item-list';
import { InventoryProvider } from '../../inventory.provider';
import { OptionsProvider } from '../../../shared/providers/options.provider';
import { Units } from '../../../shared/options.model';

@Component({
  selector: 'bag',
  templateUrl: 'bag.html'
})
export class BagComponent {
  @Input() selectedId: number;
  @Input() bag: Bag;

  @Output() onSelect: EventEmitter<number> = new EventEmitter();
  @Output() onAdd: EventEmitter<number> = new EventEmitter();
  @Output() onRemove: EventEmitter<number> = new EventEmitter();
  @Output() onModify: EventEmitter<number> = new EventEmitter();
  @Output() onMove: EventEmitter<MoveEventData> = new EventEmitter();
  @Output() onPress: EventEmitter<Bag> = new EventEmitter();

  arrowStyle: any;

  constructor(
    private _utility: UtilityProvider,
    private _inventory: InventoryProvider,
    private _options: OptionsProvider
  ) {
    this.arrowStyle = {
      "-webkit-mask-box-image": `url("${this._utility.images.inventory.bagArrow}")`
    };
  }

  get name() {
    return this.bag.name;
  }
  get weight() {
    return this.bag.weight;
  }
  get bagWeight() {
    return this.bag.bagWeight;
  }
  get image() {
    return this.bag.image;
  }
  get items() {
    return this.bag.items;
  }
  get weightClass() {
    return !this.bag.ignoreItemsWeight ? this._inventory.carriedWeightClass : "";
  }
  get hasLimitedCapacity() {
    return this.bag.hasLimitedCapacity;
  }
  get capacityDescription() {
    return "(" + this.bag.itemsWeight + " / " + this.bag.capacity + ") " + Units[this._options.units].toString();
  }
  get capacityClass() {
    return this.bag.itemsWeight > this.bag.capacity ? "heavily-encumbered" : "not-encumbered";
  }

  select(id: number) {
    this.onSelect.emit(id);
  }

  add(id: number) {
    this.onAdd.emit(id);
  }

  remove(id: number) {
    this.onRemove.emit(id);
  }

  modify(id: number) {
    this.onModify.emit(id);
  }

  move(data: MoveEventData) {
    this.onMove.emit(data);
  }

  press() {
    this.onPress.emit(this.bag);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { Bag } from '../../model/bag.model';
import { MoveEventData } from '../bag-item-list/bag-item-list';
import { InventoryProvider } from '../../inventory.provider';

@Component({
  selector: 'bag',
  templateUrl: 'bag.html'
})
export class BagComponent {
  @Input() bag: Bag;

  @Output() onAdd: EventEmitter<number> = new EventEmitter();
  @Output() onRemove: EventEmitter<number> = new EventEmitter();
  @Output() onModify: EventEmitter<number> = new EventEmitter();
  @Output() onMove: EventEmitter<MoveEventData> = new EventEmitter();

  image: string;
  arrowStyle: any;

  constructor(
    private _inventory: InventoryProvider,
  ) {
    this.image = this._inventory.images.bag;
    this.arrowStyle = {
      "-webkit-mask-box-image": `url("${this._inventory.images.bagArrow}")`
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
  get items() {
    return this.bag.items;
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

  move(data: MoveEventData){
    this.onMove.emit(data);
  }
}

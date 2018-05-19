import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BagItem } from '../../model/bag-item.model';

@Component({
  selector: 'bag-item',
  templateUrl: 'bag-item.html'
})
export class BagItemComponent {
  @Input() item: BagItem;
  @Output() onAdd: EventEmitter<void> = new EventEmitter();
  @Output() onRemove: EventEmitter<void> = new EventEmitter();
  @Output() onModify: EventEmitter<void> = new EventEmitter();
  @Output() onMove: EventEmitter<boolean> = new EventEmitter();

  constructor(
  ) {  }

  get text() {
    return this.item.text;
  }
  get description() {
    return this.item.description;
  }
  get weight() {
    return this.item.weight;
  }
  get isEquipped() {
    return this.item.isEquipped;
  }

  add() {
    this.onAdd.emit();
  }

  remove() {
    this.onRemove.emit();
  }

  modify() {
    this.onModify.emit();
  }

  move(isQuickAction: boolean) {
    this.onMove.emit(isQuickAction);
  }
}
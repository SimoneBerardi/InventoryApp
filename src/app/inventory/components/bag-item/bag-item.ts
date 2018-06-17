import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BagItem } from '../../model/bag-item.model';

@Component({
  selector: 'bag-item',
  templateUrl: 'bag-item.html'
})
export class BagItemComponent {
  @Input() selectedId: number;
  @Input() item: BagItem;
  @Output() onSelect: EventEmitter<void> = new EventEmitter();
  @Output() onAdd: EventEmitter<void> = new EventEmitter();
  @Output() onRemove: EventEmitter<void> = new EventEmitter();
  @Output() onModify: EventEmitter<void> = new EventEmitter();
  @Output() onMove: EventEmitter<boolean> = new EventEmitter();

  constructor(
  ) { }

  get name(){
    return this.item.item.name;
  }
  get text() {
    return this.item.text;
  }
  get description() {
    return this.item.item.description;
  }
  get weight() {
    return this.item.weight;
  }
  get quantity() {
    return this.item.quantity;
  }
  // get isEquipped() {
  //   return this.item.isEquipped;
  // }
  get isSelected() {
    return this.selectedId === this.item.id;
  }

  select() {
    this.onSelect.emit();
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
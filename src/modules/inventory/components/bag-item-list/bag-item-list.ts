import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BagItem } from '../../model/bag-item.model';

@Component({
  selector: 'bag-item-list',
  templateUrl: 'bag-item-list.html'
})
export class BagItemListComponent {
  @Input() items: BagItem[];
  @Output() onAdd: EventEmitter<number> = new EventEmitter();
  @Output() onRemove: EventEmitter<number> = new EventEmitter();
  @Output() onModify: EventEmitter<number> = new EventEmitter();
  @Output() onMove: EventEmitter<MoveEventData> = new EventEmitter();

  constructor(
  ) { }

  add(id: number) {
    this.onAdd.emit(id);
  }

  remove(id: number) {
    this.onRemove.emit(id);
  }

  modify(id: number) {
    this.onModify.emit(id);
  }

  move(id: number, isQuickAction: boolean) {
    this.onMove.emit({ id: id, isQuickAction: isQuickAction });
  }
}

export interface MoveEventData {
  id: number;
  isQuickAction: boolean;
}
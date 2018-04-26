import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
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

  image: string;

  constructor(
    private _utility: UtilityProvider,
  ) {
    this.image = this._utility.images.equipped;
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
}

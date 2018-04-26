import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
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

  image: string;

  constructor(
    private _utility: UtilityProvider,
  ) {
    this.image = this._utility.images.equipped;
  }

  get text() {
    return this.item.text;
  }
  get description() {
    return this.item.description;
  }
  get weight() {
    return this.item.weight;
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
}

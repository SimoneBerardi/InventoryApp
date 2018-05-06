import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { BagItem } from '../../model/bag-item.model';
import { MoveEventData } from '../bag-item-list/bag-item-list';

@Component({
  selector: 'equipped',
  templateUrl: 'equipped.html'
})
export class EquippedComponent {
  @Input() items: BagItem[];
  @Input() weight: number;

  @Output() onAdd: EventEmitter<number> = new EventEmitter();
  @Output() onRemove: EventEmitter<number> = new EventEmitter();
  @Output() onModify: EventEmitter<number> = new EventEmitter();
  @Output() onMove: EventEmitter<MoveEventData> = new EventEmitter();

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

  move(data: MoveEventData){
    this.onMove.emit(data);
  }
}

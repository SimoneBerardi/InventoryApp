import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemGroup } from '../../item-group.model';

@Component({
  selector: 'item-group',
  templateUrl: 'item-group.html'
})
export class ItemGroupComponent {
  @Input() group: ItemGroup;
  @Output() onSelect: EventEmitter<number> = new EventEmitter();
  @Output() onPress: EventEmitter<number> = new EventEmitter();

  constructor() { }

  select(id: number) {
    this.onSelect.emit(id);
  }

  press(id: number) {
    this.onPress.emit(id);
  }
}

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

  get name() {
    return this.group.name;
  }
  get items() {
    return this.group.items;
  }
  get isOpen() {
    return this.group.isOpen;
  }
  set isOpen(value: boolean) {
    this.group.isOpen = value;
  }

  select(id: number) {
    this.onSelect.emit(id);
  }

  press(id: number) {
    this.onPress.emit(id);
  }
}

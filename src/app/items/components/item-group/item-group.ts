import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemGroup } from '../../item-group.model';
import { UtilityProvider } from '../../../shared/providers/utility.provider';

@Component({
  selector: 'item-group',
  templateUrl: 'item-group.html'
})
export class ItemGroupComponent {
  @Input() group: ItemGroup;
  @Output() onSelect: EventEmitter<number> = new EventEmitter();
  @Output() onPress: EventEmitter<number> = new EventEmitter();

  constructor(
    private _utility: UtilityProvider,
  ) { }

  get name() {
    return this.group.name;
  }
  get items() {
    this._utility.sortAlfabetically(this.group.items, "name");
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

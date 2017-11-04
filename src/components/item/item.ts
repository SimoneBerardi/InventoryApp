import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from "../../model/item";
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class ItemComponent {
  @Input() item: Item;
  @Output() modify: EventEmitter<null> = new EventEmitter();

  constructor(
    private _session: SessionProvider,
  ) {
  }

  get name() {
    return this.item.name;
  }
  get weight() {
    return this.item.weight;
  }
  get quantity() {
    return this._session.character.getItemQuantity(this.item);
  }
  get isCustom() {
    return this.item.isCustom;
  }
  get description() {
    return this.item.description;
  }

  modifyEvent(event: Event) {
    event.stopPropagation();
    this.modify.emit();
  }
}

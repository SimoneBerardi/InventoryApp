import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from "../../model/item";
import { UtilityProvider } from "../../providers/utility/utility";

@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class ItemComponent {
  @Input() item: Item;
  @Output() modify: EventEmitter<null> = new EventEmitter();

  constructor(
    private _utility: UtilityProvider,
  ) {
  }

  public get name() {
    return this.item.name;
  }
  public get weight() {
    return this.item.weight;
  }
  public get quantity() {
    return this._utility.session.character.getItemQuantity(this.item);
  }
  public get isCustom() {
    return this.item.isCustom;
  }
  public get description(){
    return this.item.description;
  }

  public modifyEvent(event: Event){
    event.stopPropagation();
    this.modify.emit();
  }
}

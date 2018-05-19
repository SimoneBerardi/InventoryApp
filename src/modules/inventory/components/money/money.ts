import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Money } from '../../model/money.model';
import { InventoryProvider } from '../../inventory.provider';

@Component({
  selector: 'money',
  templateUrl: 'money.html'
})
export class MoneyComponent {
  @Input() money: Money;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  image: string;

  constructor(
    private _inventory: InventoryProvider,
  ) {
    this.image = this._inventory.images.money;
  }

  click() {
    this.onClick.emit();
  }

}

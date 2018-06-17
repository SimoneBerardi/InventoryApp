import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Money } from '../../model/money.model';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
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
    private _utility: UtilityProvider,
    private _inventory: InventoryProvider,
  ) {
    this.image = this._utility.images.inventory.money;
  }

  get weight(){
    return this.money.weight;
  }
  get platinum(){
    return this.money.platinum;
  }
  get gold(){
    return this.money.gold;
  }
  get electrum(){
    return this.money.electrum;
  }
  get silver(){
    return this.money.silver;
  }
  get copper(){
    return this.money.copper;
  }
  get moneyWeightClass(){
    return this._inventory.carriedWeightClass;
  }

  click() {
    this.onClick.emit();
  }

}

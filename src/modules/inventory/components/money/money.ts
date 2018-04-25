import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Money } from '../../model/money.model';
import { UtilityProvider } from '../../../shared/providers/utility.provider';

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
  ) {
    this.image = this._utility.images.money;
  }

  click() {
    this.onClick.emit();
  }

}

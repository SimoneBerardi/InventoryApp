import { Component, Input } from '@angular/core';
import { Item } from '../../item.model';

@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class ItemComponent {
  @Input() item: Item;

  constructor() { }

}
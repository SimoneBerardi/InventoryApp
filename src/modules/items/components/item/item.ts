import { Component, Input } from '@angular/core';
import { Item } from '../../item.model';

@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class ItemComponent {
  @Input() item: Item;

  constructor() { }

  get name(){
    return this.item.name;
  }
  get description(){
    return this.item.description;
  }

  get totalQuantity(){
    return this.item.totalQuantity;
  }

  get weight(){
    return this.item.weight;
  }
}

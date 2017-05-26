import { Component, Input } from '@angular/core';
import { BagItem } from "../../model/bagItem";

@Component({
  selector: 'bag-item',
  templateUrl: 'bag-item.html'
})
export class BagItemComponent {
  @Input() bagItem: BagItem;
  @Input() isEquipped: boolean;

  constructor() {
  }

  public get name() {
    return this.bagItem.name;
  }
  public get weight() {
    return this.bagItem.weight;
  }
  public select(){
    console.log("bagItem.select");
  }
  public delete(event: Event){
    event.stopPropagation();
    console.log("bagItem.delete");
  }

}

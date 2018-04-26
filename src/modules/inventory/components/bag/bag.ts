import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { Bag } from '../../model/bag.model';

@Component({
  selector: 'bag',
  templateUrl: 'bag.html'
})
export class BagComponent {
  @Input() bag: Bag;

  image: string;
  arrowStyle: any;

  constructor(
    private _utility: UtilityProvider,
  ) {
    this.image = this._utility.images.bag;
    this.arrowStyle = {
      "-webkit-mask-box-image": `url("${this._utility.images.bagArrow}")`
    };
  }

  get name() {
    return this.bag.name;
  }
  get weight() {
    return this.bag.weight;
  }
  get bagWeight() {
    return this.bag.bagWeight;
  }
  get items() {
    return this.bag.items;
  }

  add(id: number) {
    console.log("TODO - bag item add: " + id);
  }

  remove(id: number) {
    console.log("TODO - bag item remove: " + id);
  }

  modify(id: number) {
    console.log("TODO - bag item modify: " + id);
  }
}

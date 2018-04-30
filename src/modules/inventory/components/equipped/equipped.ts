import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { BagItem } from '../../model/bag-item.model';

@Component({
  selector: 'equipped',
  templateUrl: 'equipped.html'
})
export class EquippedComponent {
  @Input() items: BagItem[];
  @Input() weight: number;

  image: string;

  constructor(
    private _utility: UtilityProvider,
  ) {
    this.image = this._utility.images.equipped;
  }

  add(id: number) {
    console.log("TODO - equipped item add: " + id);
  }

  remove(id: number) {
    console.log("TODO - equipped item remove: " + id);
  }

  modify(id: number) {
    console.log("TODO - equipped item modify: " + id);
  }
}

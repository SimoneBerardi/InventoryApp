import { Component, Input } from '@angular/core';
import { ItemGroup } from '../../item-group.model';

@Component({
  selector: 'item-group',
  templateUrl: 'item-group.html'
})
export class ItemGroupComponent {
  @Input() group: ItemGroup;

  constructor() { }

}

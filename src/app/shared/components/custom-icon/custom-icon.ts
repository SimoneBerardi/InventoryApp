import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'custom-icon',
  templateUrl: 'custom-icon.html'
})
export class CustomIconComponent {
  @HostBinding("class") hostClass: string = "custom-icon";
  @Input() url: string;

  constructor() { }

  get style() {
    return {
      "-webkit-mask-box-image": `url("${this.url}")`
    };
  }
}

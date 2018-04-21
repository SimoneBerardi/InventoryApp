import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilityProvider } from '../../providers/utility.provider';
import { OptionsProvider } from '../../providers/options.provider';

@Component({
  selector: 'buttons-footer',
  templateUrl: 'buttons-footer.html'
})
export class ButtonsFooterComponent {
  @Input() isSaveDisabled: boolean;
  @Input() isDeleteHidden: boolean;
  @Output() onSave: EventEmitter<null> = new EventEmitter();
  @Output() onCancel: EventEmitter<null> = new EventEmitter();
  @Output() onDelete: EventEmitter<null> = new EventEmitter();

  constructor(
    private _options: OptionsProvider,
    private _utility: UtilityProvider,
  ) { }

  iconStyle(button: string) {
    return {
      "-webkit-mask-box-image": `url("${this._utility.images.buttons[button]}")`
    }
  }
}

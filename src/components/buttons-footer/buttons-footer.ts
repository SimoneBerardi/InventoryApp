import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'buttons-footer',
  templateUrl: 'buttons-footer.html'
})
export class ButtonsFooterComponent {
  @Input() isSaveEnabled: boolean;
  @Input() isDeleteHidden: boolean;
  @Output() onSave: EventEmitter<null> = new EventEmitter();
  @Output() onCancel: EventEmitter<null> = new EventEmitter();
  @Output() onDelete: EventEmitter<null> = new EventEmitter();

  constructor() { }

}

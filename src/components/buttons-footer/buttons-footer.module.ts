import { NgModule } from '@angular/core';
import { ButtonsFooterComponent } from './buttons-footer';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [ButtonsFooterComponent],
  imports: [
    IonicPageModule.forChild(ButtonsFooterComponent),
    TranslateModule.forChild()
  ],
  exports: [ButtonsFooterComponent]
})
export class ButtonsFooterComponentModule { }

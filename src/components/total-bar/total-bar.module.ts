import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TotalBarComponent } from './total-bar';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    TotalBarComponent,
  ],
  imports: [
    IonicPageModule.forChild(TotalBarComponent),
    TranslateModule.forChild()
  ],
  exports: [
    TotalBarComponent
  ]
})
export class TotalBarComponentModule {}

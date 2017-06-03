import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoneyComponent } from './money';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    MoneyComponent,
  ],
  imports: [
    IonicPageModule.forChild(MoneyComponent),
    TranslateModule.forChild()
  ],
  exports: [
    MoneyComponent
  ]
})
export class MoneyComponentModule {}

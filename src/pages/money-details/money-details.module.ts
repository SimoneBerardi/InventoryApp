import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoneyDetailsPage } from './money-details';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    MoneyDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MoneyDetailsPage),
    TranslateModule.forChild()
  ],
  exports: [
    MoneyDetailsPage
  ]
})
export class MoneyDetailsPageModule {}

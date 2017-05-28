import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BagDetailsPage } from './bag-details';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    BagDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BagDetailsPage),
    TranslateModule.forChild()
  ],
  exports: [
    BagDetailsPage
  ]
})
export class BagDetailsPageModule {}

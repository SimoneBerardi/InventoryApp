import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BagItemComponent } from './bag-item';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    BagItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(BagItemComponent),
    TranslateModule.forChild()
  ],
  exports: [
    BagItemComponent
  ]
})
export class BagItemComponentModule {}

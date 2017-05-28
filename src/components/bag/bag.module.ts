import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BagComponent } from './bag';
import { BagItemComponentModule } from "../bag-item/bag-item.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    BagComponent,
  ],
  imports: [
    BagItemComponentModule,
    IonicPageModule.forChild(BagComponent),
    TranslateModule.forChild()
  ],
  exports: [
    BagComponent
  ]
})
export class BagComponentModule {}

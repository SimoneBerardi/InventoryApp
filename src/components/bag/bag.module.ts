import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BagComponent } from './bag';
import { BagItemComponentModule } from "../bag-item/bag-item.module";
import { TranslateModule } from "@ngx-translate/core";
import { MoneyComponentModule } from "../money/money.module";

@NgModule({
  declarations: [
    BagComponent,
  ],
  imports: [
    MoneyComponentModule,
    BagItemComponentModule,
    IonicPageModule.forChild(BagComponent),
    TranslateModule.forChild()
  ],
  exports: [
    BagComponent
  ]
})
export class BagComponentModule {}

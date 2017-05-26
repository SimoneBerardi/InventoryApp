import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BagComponent } from './bag';
import { BagItemComponentModule } from "../bag-item/bag-item.module";

@NgModule({
  declarations: [
    BagComponent,
  ],
  imports: [
    BagItemComponentModule,
    IonicPageModule.forChild(BagComponent),
  ],
  exports: [
    BagComponent
  ]
})
export class BagComponentModule {}

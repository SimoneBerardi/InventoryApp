import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BagItemComponent } from './bag-item';

@NgModule({
  declarations: [
    BagItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(BagItemComponent),
  ],
  exports: [
    BagItemComponent
  ]
})
export class BagItemComponentModule {}

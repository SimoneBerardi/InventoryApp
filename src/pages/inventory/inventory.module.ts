import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryPage } from './inventory';
import { BagComponentModule } from "../../components/bag/bag.module";

@NgModule({
  declarations: [
    InventoryPage,
  ],
  imports: [
    BagComponentModule,
    IonicPageModule.forChild(InventoryPage),
  ],
  exports: [
    InventoryPage
  ]
})
export class InventoryPageModule {}

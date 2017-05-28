import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryPage } from './inventory';
import { BagComponentModule } from "../../components/bag/bag.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    InventoryPage,
  ],
  imports: [
    BagComponentModule,
    IonicPageModule.forChild(InventoryPage),
    TranslateModule.forChild()
  ],
  exports: [
    InventoryPage
  ]
})
export class InventoryPageModule {}

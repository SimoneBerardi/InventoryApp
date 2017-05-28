import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryPage } from './inventory';
import { BagComponentModule } from "../../components/bag/bag.module";
import { TranslateModule } from "@ngx-translate/core";
import { TotalBarComponentModule } from "../../components/total-bar/total-bar.module";

@NgModule({
  declarations: [
    InventoryPage,
  ],
  imports: [
    TotalBarComponentModule,
    BagComponentModule,
    IonicPageModule.forChild(InventoryPage),
    TranslateModule.forChild()
  ],
  exports: [
    InventoryPage
  ]
})
export class InventoryPageModule {}

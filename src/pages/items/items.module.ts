import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsPage } from './items';
import { ItemComponentModule } from "../../components/item/item.module";
import { TotalBarComponentModule } from "../../components/total-bar/total-bar.module";

@NgModule({
  declarations: [
    ItemsPage,
  ],
  imports: [
    TotalBarComponentModule,
    ItemComponentModule,
    IonicPageModule.forChild(ItemsPage),
  ],
  exports: [
    ItemsPage
  ]
})
export class ItemsPageModule {}

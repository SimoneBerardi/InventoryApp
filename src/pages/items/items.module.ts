import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsPage } from './items';
import { ItemComponentModule } from "../../components/item/item.module";

@NgModule({
  declarations: [
    ItemsPage,
  ],
  imports: [
    ItemComponentModule,
    IonicPageModule.forChild(ItemsPage),
  ],
  exports: [
    ItemsPage
  ]
})
export class ItemsPageModule {}

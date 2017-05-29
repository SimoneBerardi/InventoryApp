import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemsPage } from './items';
import { ItemComponentModule } from "../../components/item/item.module";
import { TotalBarComponentModule } from "../../components/total-bar/total-bar.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    ItemsPage,
  ],
  imports: [
    TotalBarComponentModule,
    ItemComponentModule,
    IonicPageModule.forChild(ItemsPage),
    TranslateModule.forChild()
  ],
  exports: [
    ItemsPage
  ]
})
export class ItemsPageModule {}

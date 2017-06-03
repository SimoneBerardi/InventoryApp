import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailsPage } from './item-details';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    ItemDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailsPage),
    TranslateModule.forChild()
  ],
  exports: [
    ItemDetailsPage
  ]
})
export class ItemDetailsPageModule {}

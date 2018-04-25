import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryPage } from './inventory';
import { TranslateModule } from "@ngx-translate/core";
import { InventoryModule } from '../../inventory.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    InventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryPage),
    TranslateModule.forChild(),
    InventoryModule,
    SharedModule,
  ],
  exports: [
    InventoryPage
  ]
})
export class InventoryPageModule {}

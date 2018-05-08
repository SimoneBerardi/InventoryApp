import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryPage } from './inventory';
import { TranslateModule } from "@ngx-translate/core";
import { InventoryModule } from '../../inventory.module';
import { SharedModule } from '../../../shared/shared.module';
import { InventoryBarComponentModule } from '../../components/inventory-bar/inventory-bar.module';

@NgModule({
  declarations: [
    InventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryPage),
    TranslateModule.forChild(),
    InventoryModule,
    SharedModule,
    InventoryBarComponentModule,
  ],
  exports: [
    InventoryPage
  ]
})
export class InventoryPageModule {}

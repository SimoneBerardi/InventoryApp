import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";
import { InventoryBarComponent } from './inventory-bar';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    InventoryBarComponent,
  ],
  imports: [
    IonicPageModule.forChild(InventoryBarComponent),
    TranslateModule.forChild(),
    SharedModule,
  ],
  exports: [
    InventoryBarComponent
  ]
})
export class InventoryBarComponentModule {}

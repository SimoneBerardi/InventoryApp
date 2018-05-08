import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";
import { InventoryBarComponent } from './inventory-bar';

@NgModule({
  declarations: [
    InventoryBarComponent,
  ],
  imports: [
    IonicPageModule.forChild(InventoryBarComponent),
    TranslateModule.forChild()
  ],
  exports: [
    InventoryBarComponent
  ]
})
export class InventoryBarComponentModule {}

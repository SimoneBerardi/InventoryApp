import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterInfoPage } from './character-info';
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from '../../../shared/shared.module';
import { InventoryBarComponentModule } from '../../../inventory/components/inventory-bar/inventory-bar.module';

@NgModule({
  declarations: [
    CharacterInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CharacterInfoPage),
    TranslateModule.forChild(),
    SharedModule,
    InventoryBarComponentModule,
  ],
  exports: [
    CharacterInfoPage
  ]
})
export class CharacterDetailsPageModule { }

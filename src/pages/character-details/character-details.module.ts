import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterDetailsPage } from './character-details';
import { TranslateModule } from "@ngx-translate/core";
import { TotalBarComponentModule } from "../../components/total-bar/total-bar.module";

@NgModule({
  declarations: [
    CharacterDetailsPage,
  ],
  imports: [
    TotalBarComponentModule,
    IonicPageModule.forChild(CharacterDetailsPage),
    TranslateModule.forChild()
  ],
  exports: [
    CharacterDetailsPage
  ]
})
export class CharacterDetailsPageModule {}

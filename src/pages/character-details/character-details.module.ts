import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterDetailsPage } from './character-details';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CharacterDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CharacterDetailsPage),
    TranslateModule.forChild()
  ],
  exports: [
    CharacterDetailsPage
  ]
})
export class CharacterDetailsPageModule {}

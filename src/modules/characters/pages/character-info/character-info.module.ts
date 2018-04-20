import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterInfoPage } from './character-info';
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    CharacterInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CharacterInfoPage),
    TranslateModule.forChild(),
    SharedModule,
  ],
  exports: [
    CharacterInfoPage
  ]
})
export class CharacterDetailsPageModule { }

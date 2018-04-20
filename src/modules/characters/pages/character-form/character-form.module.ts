import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterFormPage } from './character-form';
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    CharacterFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CharacterFormPage),
    TranslateModule.forChild(),
    SharedModule,
  ],
  exports: [
    CharacterFormPage
  ]
})
export class CharacterDetailsPageModule { }

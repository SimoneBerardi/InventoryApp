import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterListPage } from './character-list';
import { TranslateModule } from "@ngx-translate/core";
import { CharactersModule } from '../../characters.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    CharacterListPage,
  ],
  imports: [
    IonicPageModule.forChild(CharacterListPage),
    TranslateModule.forChild(),
    CharactersModule,
    SharedModule,
  ],
  exports: [
    CharacterListPage
  ]
})
export class CharacterDetailsPageModule { }

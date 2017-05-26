import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharactersListPage } from './characters-list';
import { CharacterComponentModule } from "../../components/character/character.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    CharactersListPage,
  ],
  imports: [
    CharacterComponentModule,
    IonicPageModule.forChild(CharactersListPage),
    TranslateModule.forChild()
  ],
  exports: [
    CharactersListPage
  ]
})
export class CharactersListPageModule {}

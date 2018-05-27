import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterComponent } from './components/character/character';
import { CharacterListComponent } from './components/character-list/character-list';
import { CharacterProvider } from './character.provider';
import { EncumberanceProvider } from './encumberance.provider';

@NgModule({
  declarations: [
    CharacterComponent,
    CharacterListComponent,
  ],
  imports: [
    IonicPageModule.forChild(CharacterComponent),
    IonicPageModule.forChild(CharacterListComponent),
  ],
  exports: [
    CharacterComponent,
    CharacterListComponent,
  ]
})
export class CharactersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CharactersModule,
      providers: [
        CharacterProvider,
        EncumberanceProvider,
      ]
    };
  }
}

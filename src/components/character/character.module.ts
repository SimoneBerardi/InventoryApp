import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterComponent } from './character';

@NgModule({
  declarations: [
    CharacterComponent,
  ],
  imports: [
    IonicPageModule.forChild(CharacterComponent),
  ],
  exports: [
    CharacterComponent
  ]
})
export class CharacterComponentModule {}

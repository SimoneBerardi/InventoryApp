import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from '../../shared.module';
import { OptionsPage } from './options';

@NgModule({
  declarations: [
    OptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(OptionsPage),
    TranslateModule.forChild(),
    SharedModule,
  ],
  exports: [
    OptionsPage
  ]
})
export class HomePageModule {}

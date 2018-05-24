import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditsPage } from './credits';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    CreditsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditsPage),
    TranslateModule.forChild(),
    SharedModule,
  ],
})
export class CreditsPageModule {}

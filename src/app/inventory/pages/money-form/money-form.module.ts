import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoneyFormPage } from './money-form';
import { InventoryModule } from '../../inventory.module';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MoneyFormPage,
  ],
  imports: [
    IonicPageModule.forChild(MoneyFormPage),
    TranslateModule.forChild(),
    InventoryModule,
    SharedModule,
  ],
})
export class MoneyFormPageModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryModule } from '../../inventory.module';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BagFormPage } from './bag-form';

@NgModule({
  declarations: [
    BagFormPage,
  ],
  imports: [
    IonicPageModule.forChild(BagFormPage),
    TranslateModule.forChild(),
    InventoryModule,
    SharedModule,
  ],
})
export class BagFormPageModule { }

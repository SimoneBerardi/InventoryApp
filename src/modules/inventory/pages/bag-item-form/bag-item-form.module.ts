import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryModule } from '../../inventory.module';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BagItemFormPage } from './bag-item-form';

@NgModule({
  declarations: [
    BagItemFormPage,
  ],
  imports: [
    IonicPageModule.forChild(BagItemFormPage),
    TranslateModule.forChild(),
    InventoryModule,
    SharedModule,
  ],
})
export class BagItemFormPageModule { }

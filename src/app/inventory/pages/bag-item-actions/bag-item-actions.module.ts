import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryModule } from '../../inventory.module';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BagItemActionsPage } from './bag-item-actions';

@NgModule({
  declarations: [
    BagItemActionsPage,
  ],
  imports: [
    IonicPageModule.forChild(BagItemActionsPage),
    TranslateModule.forChild(),
    InventoryModule,
    SharedModule,
  ],
})
export class BagItemActionsPageModule { }

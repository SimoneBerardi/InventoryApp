import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ItemActionsPage } from './item-actions';
import { ItemsModule } from '../../item.module';

@NgModule({
  declarations: [
    ItemActionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemActionsPage),
    TranslateModule.forChild(),
    ItemsModule,
    SharedModule,
  ],
})
export class ItemActionsPageModule { }

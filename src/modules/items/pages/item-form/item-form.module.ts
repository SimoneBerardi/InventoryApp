import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemFormPage } from './item-form';
import { ItemsModule } from '../../item.module';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ItemFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemFormPage),
    TranslateModule.forChild(),
    ItemsModule,
    SharedModule,
  ],
})
export class ItemFormPageModule {}

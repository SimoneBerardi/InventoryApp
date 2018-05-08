import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemListPage } from './item-list';
import { TranslateModule } from '@ngx-translate/core';
import { ItemsModule } from '../../item.module';
import { SharedModule } from '../../../shared/shared.module';
import { InventoryBarComponentModule } from '../../../inventory/components/inventory-bar/inventory-bar.module';

@NgModule({
  declarations: [
    ItemListPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemListPage),
    TranslateModule.forChild(),
    ItemsModule,
    SharedModule,
    InventoryBarComponentModule,
  ],
  exports: [
    ItemListPage,
  ]
})
export class ItemListPageModule { }

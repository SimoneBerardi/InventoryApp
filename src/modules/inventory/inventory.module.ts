import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryProvider } from './inventory.provider';
import { MoneyComponent } from './components/money/money';
import { TranslateModule } from '@ngx-translate/core';
import { BagComponent } from './components/bag/bag';
import { BagItemListComponent } from './components/bag-item-list/bag-item-list';
import { BagItemComponent } from './components/bag-item/bag-item';

@NgModule({
  declarations: [
    MoneyComponent,
    BagComponent,
    BagItemListComponent,
    BagItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(MoneyComponent),
    IonicPageModule.forChild(BagComponent),
    IonicPageModule.forChild(BagItemListComponent),
    IonicPageModule.forChild(BagItemComponent),
    TranslateModule.forChild(),
  ],
  exports: [
    MoneyComponent,
    BagComponent,
    BagItemListComponent,
    BagItemComponent,
  ]
})
export class InventoryModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InventoryModule,
      providers: [
        InventoryProvider,
      ]
    };
  }
}
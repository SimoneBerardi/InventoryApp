import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryProvider } from './inventory.provider';
import { MoneyComponent } from './components/money/money';
import { TranslateModule } from '@ngx-translate/core';
import { BagComponent } from './components/bag/bag';
import { BagItemListComponent } from './components/bag-item-list/bag-item-list';
import { BagItemComponent } from './components/bag-item/bag-item';
import { EquippedComponent } from './components/equipped/equipped';
import { MoneyProvider } from './money.provider';
import { BagItemProvider } from './bag-item.provider';
import { BagProvider } from './bag.provider';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MoneyComponent,
    EquippedComponent,
    BagComponent,
    BagItemListComponent,
    BagItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(MoneyComponent),
    IonicPageModule.forChild(EquippedComponent),
    IonicPageModule.forChild(BagComponent),
    IonicPageModule.forChild(BagItemListComponent),
    IonicPageModule.forChild(BagItemComponent),
    TranslateModule.forChild(),
    SharedModule,
  ],
  exports: [
    MoneyComponent,
    EquippedComponent,
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
        MoneyProvider,
        BagItemProvider,
        BagProvider,
        InventoryProvider,
      ]
    };
  }
}
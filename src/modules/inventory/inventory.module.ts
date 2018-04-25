import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryProvider } from './inventory.provider';
import { MoneyComponent } from './components/money/money';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MoneyComponent,
  ],
  imports: [
    IonicPageModule.forChild(MoneyComponent),
    TranslateModule.forChild(),
  ],
  exports: [
    MoneyComponent,
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
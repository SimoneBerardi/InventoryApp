import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemProvider } from './item.provider';
import { ItemGroupComponent } from './components/item-group/item-group';
import { ItemComponent } from './components/item/item';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ItemComponent,
    ItemGroupComponent,
  ],
  imports: [
    IonicPageModule.forChild(ItemComponent),
    IonicPageModule.forChild(ItemGroupComponent),
    TranslateModule.forChild(),
    SharedModule,
  ],
  exports: [
    ItemComponent,
    ItemGroupComponent,
  ]
})
export class ItemsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ItemsModule,
      providers: [
        ItemProvider,
      ]
    };
  }
}
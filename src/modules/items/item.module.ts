import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemProvider } from './item.provider';
import { ItemGroupComponent } from './components/item-group/item-group';
import { ItemComponent } from './components/item/item';

@NgModule({
  declarations: [
    ItemComponent,
    ItemGroupComponent,
  ],
  imports: [
    IonicPageModule.forChild(ItemComponent),
    IonicPageModule.forChild(ItemGroupComponent),
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
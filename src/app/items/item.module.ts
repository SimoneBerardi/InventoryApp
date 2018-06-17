import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemProvider } from './item.provider';
import { ItemGroupComponent } from './components/item-group/item-group';
import { ItemComponent } from './components/item/item';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { SearchBarComponent } from './components/search-bar/search-bar';

@NgModule({
  declarations: [
    ItemComponent,
    ItemGroupComponent,
    SearchBarComponent,
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
    SearchBarComponent,
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
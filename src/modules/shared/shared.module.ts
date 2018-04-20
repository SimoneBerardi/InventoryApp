import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UtilityProvider } from './providers/utility.provider';
import { StorageProvider } from './providers/storage.provider';
import { InterfaceProvider } from './providers/interface.provider';
import { SessionProvider } from './providers/session.provider';
import { PageHeaderComponent } from './components/page-header/page-header';
import { TranslateModule } from '@ngx-translate/core';
import { TotalBarComponent } from './components/total-bar/total-bar';
import { ButtonsFooterComponent } from './components/buttons-footer/buttons-footer';
import { CharactersModule } from '../characters/characters.module';
import { TranslateProvider } from './providers/translate.provider';
import { OptionsProvider } from './providers/options.provider';

@NgModule({
  declarations: [
    PageHeaderComponent,
    TotalBarComponent,
    ButtonsFooterComponent,
  ],
  imports: [
    IonicPageModule.forChild(PageHeaderComponent),
    IonicPageModule.forChild(TotalBarComponent),
    IonicPageModule.forChild(ButtonsFooterComponent),
    TranslateModule.forChild(),
  ],
  exports: [
    PageHeaderComponent,
    TotalBarComponent,
    ButtonsFooterComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        UtilityProvider,
        StorageProvider,
        SessionProvider,
        TranslateProvider,
        OptionsProvider,
        InterfaceProvider,
      ]
    };
  }
}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UtilityProvider } from './providers/utility.provider';
import { StorageProvider } from './providers/storage.provider';
import { InterfaceProvider } from './providers/interface.provider';
import { PageHeaderComponent } from './components/page-header/page-header';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsFooterComponent } from './components/buttons-footer/buttons-footer';
import { TranslateProvider } from './providers/translate.provider';
import { OptionsProvider } from './providers/options.provider';
import { WeightPipe } from './weight.pipe';
import { ThemeProvider } from './providers/theme.provider';
import { MigrationProvider } from './providers/migration.provider';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { CustomIconComponent } from './components/custom-icon/custom-icon';

@NgModule({
  declarations: [
    CustomIconComponent,
    PageHeaderComponent,
    ButtonsFooterComponent,
    WeightPipe,
  ],
  imports: [
    IonicPageModule.forChild(CustomIconComponent),
    IonicPageModule.forChild(PageHeaderComponent),
    IonicPageModule.forChild(ButtonsFooterComponent),
    TranslateModule.forChild(),
  ],
  exports: [
    CustomIconComponent,
    PageHeaderComponent,
    ButtonsFooterComponent,
    WeightPipe,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        UtilityProvider,
        StorageProvider,
        TranslateProvider,
        OptionsProvider,
        InterfaceProvider,
        ThemeProvider,
        MigrationProvider,
        File,
        FileChooser,
      ]
    };
  }
}

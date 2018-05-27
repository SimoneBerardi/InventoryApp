import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { UtilityProviderOld } from '../providers/utility/utility';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpModule } from '@angular/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OptionsProvider } from '../providers/options/options';
import { CharactersProvider } from '../providers/characters/characters';
import { SessionProvider } from '../providers/session/session';
import { ItemsListProvider } from '../providers/items-list/items-list';
import { InterfaceProvider } from '../providers/interface/interface';
import { TranslateProvider } from '../providers/translate/translate';
import { MigrationsProvider } from '../providers/migrations/migrations';
import { ReactiveFormsModule } from '@angular/forms';
import { CharactersModule } from '../modules/characters/characters.module';
import { SharedModule } from '../modules/shared/shared.module';
import { ItemsModule } from '../modules/items/item.module';
import { InventoryModule } from '../modules/inventory/inventory.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      driverOrder: ['indexeddb', 'websql']
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule.forRoot(),
    CharactersModule.forRoot(),
    ItemsModule.forRoot(),
    InventoryModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { UtilityProvider } from '../providers/utility/utility';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpModule } from '@angular/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OptionsProvider } from '../providers/options/options';
import { CharactersListProvider } from '../providers/characters-list/characters-list';
import { SessionProvider } from '../providers/session/session';
import { ItemsListProvider } from '../providers/items-list/items-list';
import { InterfaceProvider } from '../providers/interface/interface';
import { TranslateProvider } from '../providers/translate/translate';
import { MigrationsProvider } from '../providers/migrations/migrations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UtilityProvider,
    OptionsProvider,
    CharactersListProvider,
    SessionProvider,
    ItemsListProvider,
    InterfaceProvider,
    TranslateProvider,
    MigrationsProvider,
  ]
})
export class AppModule { }

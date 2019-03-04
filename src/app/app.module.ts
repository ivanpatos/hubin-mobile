import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';
import { DocumentListPage } from '../pages/document-list/document-list';
import { DocumentFiltersPage } from '../pages/document-filters/document-filters';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { DocumentServiceProvider } from '../providers/document-service/document-service';
import { MateriaServiceProvider } from '../providers/materia-service/materia-service';
import { EntidadServiceProvider } from '../providers/entidad-service/entidad-service';
import { IdiomaServiceProvider } from '../providers/idioma-service/idioma-service';
import { NivelServiceProvider } from '../providers/nivel-service/nivel-service';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    UserPage,
    DocumentListPage,
    DocumentFiltersPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    UserPage,
    DocumentListPage,
    DocumentFiltersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    DocumentServiceProvider,
    MateriaServiceProvider, File, FileOpener,
    EntidadServiceProvider,
    IdiomaServiceProvider,
    NivelServiceProvider
  ]
})
export class AppModule {}

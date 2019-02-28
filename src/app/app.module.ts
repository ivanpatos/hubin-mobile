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
import { MateriaPage } from '../pages/materia/materia';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { DocumentServiceProvider } from '../providers/document-service/document-service';
import { MateriaServiceProvider } from '../providers/materia-service/materia-service';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    UserPage,
    DocumentListPage,
    MateriaPage
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
    MateriaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    DocumentServiceProvider,
    MateriaServiceProvider, File, FileOpener
  ]
})
export class AppModule {}

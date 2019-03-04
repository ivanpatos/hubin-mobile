import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public fb: Facebook) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.storage.get('token').then((data) => {
        if (data == null) {
          this.nav.setRoot(LoginPage);
        }
        else {
          this.nav.setRoot(HomePage);
        }
      }, (error) => {
        console.log(error);
      });
    });
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Mi cuenta', component: UserPage }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logoutAction() {
    this.fb.getLoginStatus().then((response) => {
      if (response.status == "connected") {
        console.log("Connected to facebook");
        this.fb.logout().then((response) => {
          this.storage.clear();
          this.nav.setRoot(LoginPage);
        }, (error) => {
          console.log(error);
        });
      }
      else {
        console.log("Not connected to facebook");
        this.storage.clear();
        this.nav.setRoot(LoginPage);
      }
    });
  }

}

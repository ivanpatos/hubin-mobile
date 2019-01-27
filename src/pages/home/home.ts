import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, 'menu');
  }

  ionViewCanEnter() {
    /*this.storage.get('user')
    .then((data) => {
      this.user = {
        username: data.username,
        password: data.password
      };
      this.userReady = true;
    }, (error) => {
      console.log(error);
    });*/
  }

}

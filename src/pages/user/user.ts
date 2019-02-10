import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public userServiceProvider: UserServiceProvider, public domSanitizer: DomSanitizer) {
  }

  async ionViewWillEnter() {

    var token = await this.storage.get('token').then((data) => { return data; });
    var id = await this.storage.get('data').then((data) => { return data.id; });

    console.log(token);
    console.log(id);

    this.userServiceProvider.getUser(token, id).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { UserServiceProvider } from '../../providers/user-service/user-service';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  invalidUser: boolean = false;

  validation_messages = {
    'username': [
      { type: 'required', message: 'Usuario requerido.' }
    ],
    'password': [
      { type: 'required', message: 'Password requerido.' }
    ]
  };

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public fb: Facebook, public storage: Storage, public formBuilder: FormBuilder, public userServiceProvider: UserServiceProvider) {
    this.menuCtrl.enable(false, 'menu');
  }

  ionViewWillLoad() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  login(username, password) {
    let token = this.userServiceProvider.generateToken(username, password);
    this.userServiceProvider.login(token).subscribe(
      (data) => {
        console.log(data);
        this.storage.set('token', token);
        this.storage.set('data', data);
        this.navCtrl.setRoot(HomePage);
      },
      (error) => {
        this.invalidUser = true;
        console.log(error);
        this.fb.getLoginStatus().then((response) => {
          if (response.status == "connected") {
            this.fb.logout().then((response) => {
            }, (error) => {
              console.log(error);
            });
          }
        });
      }
    );
  }

  loginFormAction() {
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;
    this.login(username, password);
  }

  loginFbAction() {
    this.fb.login(['public_profile', 'email', 'user_birthday'])
    .then( (res: FacebookLoginResponse) => {
      if(res.status == "connected") {
        this.fb.api("/me?fields=id,email", []).then((user) => {
          let username = user.email;
          let password = user.id;
          this.login(username, password);
        });
      }
      else {
        console.log("An error occurred...");
      }
    })
    .catch((e) => {
      console.log('Error logging into Facebook', e);
    });
  }

}

import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DocumentServiceProvider } from '../../providers/document-service/document-service';
import { DocumentListPage } from '../document-list/document-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isSearchbarOpened: boolean = false;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public alertController: AlertController,
    public storage: Storage, public documentServiceProvider: DocumentServiceProvider) {
    this.menuCtrl.enable(true, 'menu');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      title: 'No documents found',
      subTitle: 'Search again please',
      buttons: ['OK']
    });
    await alert.present();
  }

  async onSearch(event){
    var token = await this.storage.get('token').then((data) => { return data; });
    var id = await this.storage.get('data').then((data) => { return data.id; });
    this.documentServiceProvider.searchDocument(token, id, event.target.value).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.navCtrl.push(DocumentListPage, { data: data });
        }
        else {
          this.presentAlert();
        }
      },
      (error) => {
        console.log(error);
      }
    );
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

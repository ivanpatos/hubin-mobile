import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { DocumentDownloaderProvider } from '../../providers/document-downloader/document-downloader';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user: any
  documentos: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
    public userServiceProvider: UserServiceProvider, private documentDownloaderProvider: DocumentDownloaderProvider,
    public domSanitizer: DomSanitizer) {
  }

  async ionViewWillEnter() {
    var token = await this.storage.get('token').then((data) => { return data; });
    var id = await this.storage.get('data').then((data) => { return data.id; });
    this.userServiceProvider.getUser(token, id).subscribe( (data) => {this.user = data;}, (error) => {console.log(error);} );
    this.userServiceProvider.getDocumentos(token).subscribe( (data) => {this.documentos = data;}, (error) => {console.log(error);} );
  }

  downloadDocument(documento) {
    this.documentDownloaderProvider.download(documento);
  }

}

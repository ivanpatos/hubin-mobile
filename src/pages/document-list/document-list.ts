import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-document-list',
  templateUrl: 'document-list.html',
})
export class DocumentListPage {

  documents: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.documents = navParams.get('data');
  }

}

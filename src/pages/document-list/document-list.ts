import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DocumentFiltersPage } from '../document-filters/document-filters';
import { DocumentDownloaderProvider } from '../../providers/document-downloader/document-downloader';

@Component({
  selector: 'page-document-list',
  templateUrl: 'document-list.html',
})
export class DocumentListPage {

  nombre: any
  materia: any
  documents: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private documentDownloaderProvider: DocumentDownloaderProvider) {
    this.nombre = navParams.get('nombre');
    this.materia = navParams.get('materia');
    this.documents = navParams.get('documents');
  }

  ionViewWillEnter() {
    this.documents = this.navParams.get('documents');
  }

  downloadDocument(documento) {
    this.documentDownloaderProvider.download(documento);
  }

  applyFilters() {
    this.navCtrl.push(DocumentFiltersPage, { nombre: this.nombre, materia: this.materia });
  }

}

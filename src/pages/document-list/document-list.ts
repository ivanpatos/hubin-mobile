import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { DocumentServiceProvider } from '../../providers/document-service/document-service';
import { DocumentFiltersPage } from '../document-filters/document-filters';

@Component({
  selector: 'page-document-list',
  templateUrl: 'document-list.html',
})
export class DocumentListPage {

  nombre: any
  materia: any
  documents: any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public documentServiceProvider: DocumentServiceProvider,
    private file: File, private fileOpener: FileOpener) {
    this.nombre = navParams.get('nombre');
    this.materia = navParams.get('materia');
    this.documents = navParams.get('documents');
  }

  ionViewWillEnter() {
    this.documents = this.navParams.get('documents');
  }

  async downloadDocument(documento) {
    console.log(documento);
    var idVersion = Math.max.apply(Math, documento.versiones.map(function(version) { return version.id; }));
    var token = await this.storage.get('token').then((data) => { return data; });
    this.documentServiceProvider.searchVersion(token, documento.id, idVersion).subscribe(
      (version: any) => {
        console.log(version);
        this.saveAndOpenPdf(version.data, documento.nombre + ".pdf");
      },
      (error) => {
        console.error(error);
      }
    );
  }

  saveAndOpenPdf(pdf: string, filename: string) {
    const writeDirectory = this.file.externalRootDirectory + '/Download/';
    console.log(writeDirectory);
    this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'application/pdf'), {replace: true}).then(() => {
      this.fileOpener.open(writeDirectory + filename, 'application/pdf').catch(() => {
        console.error('Error opening pdf file');
      });
    }).catch((error) => {
      console.error('Error writing pdf file: ' + error);
    });
  }

  convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }

  applyFilters() {
    this.navCtrl.push(DocumentFiltersPage, { nombre: this.nombre, materia: this.materia });
  }

}

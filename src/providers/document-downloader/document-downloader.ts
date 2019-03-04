import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { DocumentServiceProvider } from '../../providers/document-service/document-service';

@Injectable()
export class DocumentDownloaderProvider {

  constructor(private storage: Storage, private file: File, private fileOpener: FileOpener, private documentServiceProvider: DocumentServiceProvider) {
  }

  async download(documento) {
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

}

import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentServiceProvider } from '../../providers/document-service/document-service';
import { MateriaServiceProvider } from '../../providers/materia-service/materia-service';
import { DocumentListPage } from '../document-list/document-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isSearchbarOpened: boolean = false;
  materias: any

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public alertController: AlertController,
    public storage: Storage, public documentServiceProvider: DocumentServiceProvider, public materiaServiceProvider: MateriaServiceProvider,
    public domSanitizer: DomSanitizer) {
    this.menuCtrl.enable(true, 'menu');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      title: 'No se han encontrado documentos',
      subTitle: 'Vuelva a buscar por favor',
      buttons: ['OK']
    });
    await alert.present();
  }

  async onSearch(event){
    var token = await this.storage.get('token').then((data) => { return data; });
    this.documentServiceProvider.searchDocument(token, event.target.value).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.navCtrl.push(DocumentListPage, { nombre: event.target.value, documents: data });
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

  async ionViewWillEnter() {
    var token = await this.storage.get('token').then((data) => { return data; });
    this.materiaServiceProvider.getMateriasDestacadas(token).subscribe(
      (data) => {
        this.materias = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async onSearchByMateria(materia){
    var token = await this.storage.get('token').then((data) => { return data; });
    this.documentServiceProvider.searchDocumentByMateria(token, materia.id).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.navCtrl.push(DocumentListPage, { materia: materia, documents: data });
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

}

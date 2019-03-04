import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DocumentServiceProvider } from '../../providers/document-service/document-service';
import { MateriaServiceProvider } from '../../providers/materia-service/materia-service';
import { EntidadServiceProvider } from '../../providers/entidad-service/entidad-service';
import { NivelServiceProvider } from '../../providers/nivel-service/nivel-service';
import { IdiomaServiceProvider } from '../../providers/idioma-service/idioma-service';

@Component({
  selector: 'page-document-filters',
  templateUrl: 'document-filters.html',
})
export class DocumentFiltersPage {

  materias: any
  entidades: any
  niveles: any
  idiomas: any

  nombre: any
  materia: any

  selectedMateria: any
  selectedEntidad: any
  selectedIdioma: any
  selectedNivel: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController, public storage: Storage,
    public documentServiceProvider: DocumentServiceProvider,
    public materiaServiceProvider: MateriaServiceProvider,
    public entidadServiceProvider: EntidadServiceProvider,
    public nivelServiceProvider: NivelServiceProvider,
    public idiomaServiceProvider: IdiomaServiceProvider) {
      this.nombre = navParams.get('nombre');
      this.materia = navParams.get('materia');
  }

  async ionViewWillEnter() {
    var token = await this.storage.get('token').then((data) => { return data; });
    this.materiaServiceProvider.getMaterias(token).subscribe( (data) => {this.materias = data;}, (error) => {console.log(error);} );
    this.entidadServiceProvider.getEntidades(token).subscribe( (data) => {this.entidades = data;}, (error) => {console.log(error);} );
    this.nivelServiceProvider.getNiveles(token).subscribe( (data) => {this.niveles = data;}, (error) => {console.log(error);} );
    this.idiomaServiceProvider.getIdiomas(token).subscribe( (data) => {this.idiomas = data;}, (error) => {console.log(error);} );
  }

  async applyFilters() {
    var token = await this.storage.get('token').then((data) => { return data; });
    this.documentServiceProvider.searchDocumentWithFilters(token,
      this.nombre,
      this.materia ? this.materia.id : (this.selectedMateria ? this.selectedMateria.id : null),
      this.selectedEntidad ? this.selectedEntidad.id : null,
      this.selectedIdioma ? this.selectedIdioma.id : null,
      this.selectedNivel ? this.selectedNivel.id : null).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          this.navCtrl.getPrevious().data.documents = data;
          this.navCtrl.pop();
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

  async presentAlert() {
    const alert = await this.alertController.create({
      title: 'No documents found',
      subTitle: 'Search again please',
      buttons: ['OK']
    });
    await alert.present();
  }

}

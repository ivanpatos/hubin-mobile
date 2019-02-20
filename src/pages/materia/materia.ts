import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-materia',
  templateUrl: 'materia.html',
})
export class MateriaPage {

  materia: any
  documents: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.materia = navParams.get('materia');
    this.documents = navParams.get('documents');
  }

}

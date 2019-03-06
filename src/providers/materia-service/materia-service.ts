import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base-provider';

@Injectable()
export class MateriaServiceProvider {

  constructor(public http: HttpClient) {
  }

  generateToken(username, password) {
    return btoa(username + ":" + password);
  }

  getMateriasDestacadas(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + token
      })
    };
    return this.http.get(BaseProvider.getApiPath()+"/hubin/materia/destacadas", httpOptions);
  }

  getMaterias(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + token
      })
    };
    return this.http.get(BaseProvider.getApiPath()+"/hubin/materia", httpOptions);
  }

}

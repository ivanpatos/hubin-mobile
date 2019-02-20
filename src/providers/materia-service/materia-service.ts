import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get("http://192.168.0.4:8085/hubin/materia/destacadas", httpOptions);
  }

}

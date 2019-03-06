import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base-provider';

@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
  }

  generateToken(username, password) {
    return btoa(username + ":" + password);
  }

  login(token) {
    console.log("Token: " + token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + token
      })
    };
    return this.http.post(BaseProvider.getApiPath()+"/hubin/alumno/login", null, httpOptions);
  }

  getUser(token, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + token
      })
    };
    return this.http.get(BaseProvider.getApiPath()+"/hubin/alumno/" + id, httpOptions);
  }

  getDocumentos(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + token
      })
    };
    return this.http.get(BaseProvider.getApiPath()+"/hubin/alumno/documentos", httpOptions);
  }

}

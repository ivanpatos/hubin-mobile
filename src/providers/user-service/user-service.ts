import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.post("http://192.168.0.4:8085/hubin/alumno/login", null, httpOptions);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base-provider';

@Injectable()
export class EntidadServiceProvider {

  constructor(public http: HttpClient) {
  }

  getEntidades(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + token
      })
    };
    return this.http.get(BaseProvider.getApiPath()+"/hubin/entidad", httpOptions);
  }

}

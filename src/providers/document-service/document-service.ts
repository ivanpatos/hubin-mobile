import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DocumentServiceProvider {

  constructor(public http: HttpClient) {
  }

  searchDocument(token, name) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + token
      })
    };
    return this.http.get("http://192.168.0.4:8085/hubin/documento?name=" + name, httpOptions);
  }

  searchDocumentByMateria(token, idMateria) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + token
      })
    };
    return this.http.get("http://192.168.0.4:8085/hubin/documento?subject=" + idMateria, httpOptions);
  }

  searchVersion(token, idDocumento, idVersion) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + token
      })
    };
    return this.http.get("http://192.168.0.4:8085/hubin/documento/" + idDocumento + /version/ + idVersion, httpOptions);
  }

  searchDocumentByMateriaWithFilters(token, idMateria, idEntidad, idIdioma, idNivel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + token
      })
    };
    var query = "?subject=" + idMateria;
    if (idEntidad != null) query += "&entity=" + idEntidad;
    if (idIdioma != null) query += "&language=" + idIdioma;
    if (idNivel != null) query += "&level=" + idNivel;
    return this.http.get("http://192.168.0.4:8085/hubin/documento" + query, httpOptions);
  }

}

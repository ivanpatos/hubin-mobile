import { Injectable } from '@angular/core';

@Injectable()
export class BaseProvider {
constructor() {
}
public static getApiPath() {
    return 'http://192.168.0.8:8085';
  };

}

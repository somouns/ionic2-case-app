import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HomeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HomeService {
  constructor(public http: Http) {
    console.log('Hello HomeService Provider');
  }
  getOther() {
    return new Promise((resolve, reject) => {
      this.http.get("assets/data/home-page.json")
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.init);
        }, err => {
          reject(err);
        })
    })
  }
}

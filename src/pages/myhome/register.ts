import { Component } from '@angular/core';

import { NavController,Loading } from 'ionic-angular';
import { LoginPage } from '../myhome/login';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  constructor(public navCtrl:NavController) {

  }
  backloginFull() {
    this.navCtrl.push(LoginPage);
  }
}

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';


@Component({
  selector: 'page-car',
  templateUrl: 'car.html'
})
export class CarPage {
  constructor(public navCtrl: NavController) {}

  goToOtherPage() {
    this.navCtrl.push(AboutPage);
  }
}

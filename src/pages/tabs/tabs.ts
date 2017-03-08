import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { CarPage } from '../car/car';
import { LoginPage } from '../myhome/login';
import { HomeContantPage } from '../home-contant/home-contant';
import { FormPage } from '../form/form';
import { MainPage } from '../main/main';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = MainPage;
  tab2Root: any = ContactPage;
  tab3Root: any = FormPage;
  tab4Root: any = CarPage;
  tab5Root: any = LoginPage;
  tab6Root: any = HomePage;

  constructor() {

  }
}

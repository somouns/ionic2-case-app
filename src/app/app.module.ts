import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { HttpService } from "../providers/HttpService"

import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { CarPage } from '../pages/car/car';
//import { MainPage } from '../pages/main/main'; //以下三个封装成单独的模块
//import { HomePage } from '../pages/home/home';
//import { ContactPage } from '../pages/contact/contact';
import { MyHomePage } from '../pages/myhome/myhome';
import { LoginPage } from '../pages/myhome/login';
import { RegisterPage } from '../pages/myhome/register';
import { HomeContantPage } from '../pages/home-contant/home-contant';
import { FormPage } from '../pages/form/form';

import { HomeModule } from '../pages/home/home.module';
import { ContactModule } from '../pages/contact/contact.module';
import { MainModule } from '../pages/main/main.module';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    //ContactPage,
    //MainPage,
    //HomePage,
    TabsPage,
    CarPage,
    MyHomePage,
    LoginPage,
    RegisterPage,
    HomeContantPage,
    FormPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HomeModule,//导入对应的模块
    ContactModule,
    MainModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    //ContactPage,
    //MainPage,
    //HomePage,
    TabsPage,
    CarPage,
    MyHomePage,
    LoginPage,
    RegisterPage,
    HomeContantPage,
    FormPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

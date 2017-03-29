import { Component,OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { HomeContantPage } from '../home-contant/home-contant';

import { Router } from "@angular/router";
import { HomeService } from "../../providers/home-service";
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers:[HomeService]
})
export class MainPage {
  public currentPic = 0;
  public initList:{};
  //图片轮播处理
  constructor(public navCtrl:NavController, public service:HomeService) {
    setInterval(() => {
      let id = (this.currentPic + 1) % 3;
      this.currentPic = id;
    }, 3000);

//http服务
    this.service.getOther().then(data=>{
      console.log(data);
      this.initList=data;
    });
  }
//跳转到主内容区域
  goToContactPage() {
    this.navCtrl.push(ContactPage);
  }

//跳转到商品详情页
  listHomeContant() {
    this.navCtrl.push(HomeContantPage);
  }

  ngOnInit() {
  }

  changebanner(id) {
    console.log(id);
    this.currentPic = id;
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    setTimeout(() => {
      //console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}

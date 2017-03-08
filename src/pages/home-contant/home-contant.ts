import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-home-contant',
  templateUrl: 'home-contant.html'
})
export class HomeContantPage {
  public homecontId;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    //获取main.ts页面listHomeContant点击事件传递过来的参数
    this.homecontId=this. navParams.get("homecontId");
    console.log(this.homecontId);//打印参数
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeContantPage');
  }
}

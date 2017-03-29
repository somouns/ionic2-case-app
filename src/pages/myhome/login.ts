import { Component } from '@angular/core';

import { NavController,LoadingController,Toast,ToastController } from 'ionic-angular';
import { MyHomePage } from '../myhome/myhome';
import { RegisterPage } from '../myhome/register';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  public userInfo = {
    username: 'parry',
    password: '123456'
  };

  constructor(public navCtrl:NavController,
              public loadingCtrl:LoadingController,
              private toastCtrl:ToastController) {

  }

  loginFull() {
    //这里判断用户名输入的格式是否正确
    if (this.userInfo.username == '' || this.userInfo.username.length <= 3) {
      let toast = this.toastCtrl.create({
        message: '请输入正确的用户名',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
    //这里判断密码格式是否正确
    }else if( this.userInfo.password.length <= 3){
      let toast = this.toastCtrl.create({
        message: '请输入正确的密码',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
    }else{
      //这里登陆成功，登陆到用户中心页面
      let loading = this.loadingCtrl.create({
        content: '正在登陆...'
      });
      loading.present();
      setTimeout(() => {
        this.navCtrl.push(MyHomePage);
      }, 2000);
      setTimeout(() => {
        loading.dismiss();
      }, 2000);
    }


    //点击登录弹出等待界面
    /*let loading = this.loadingCtrl.create({
     content: '正在登陆...'
     });
     loading.present();
     setTimeout(() => {
     this.navCtrl.push(MyHomePage);
     }, 2000);
     setTimeout(() => {
     loading.dismiss();
     }, 2000);*/
  }

  registerFull() {
    this.navCtrl.push(RegisterPage);
  }
}

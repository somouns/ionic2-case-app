import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen,Geolocation,LocalNotifications  } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      //获取位置信息
      Geolocation.getCurrentPosition().then((resp) => {
        //console.log(resp.coords.latitude);//获取经度
        //console.log(resp.coords.longitude);//获取纬度
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      let watch = Geolocation.watchPosition();
      watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
      });

      //本地消息通知
      LocalNotifications.schedule({
        text: '本地化组件提示消息',
        at: new Date(new Date().getTime() + 3600),
        led: 'FF0000',
        sound: null
      });
    });
  }
}

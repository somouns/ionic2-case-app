import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ImagePicker} from 'ionic-native';

@Component({
  selector: 'page-my',
  templateUrl: 'myhome.html'
})
export class MyHomePage {

  constructor(public navCtrl: NavController) {

  }
  //用户上传头像
  uploadImage(){
    var opt = { maxImagesCount:1, width:100, height:100, quality:50 };
    ImagePicker.getPictures(opt).then((results) => {
      for (var i = 0; i < results.length; i++) {
        //console.log('Image URI: ' + results[i]);
        console.log('Image URI: ' + results[i]);
        //将图片上传到服务器，调用 API
      }
    }, (err) => { }) ;
  }
}

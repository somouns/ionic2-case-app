import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';

declare var AMap;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public map:any;
  mapIsComplete:boolean = false;//地图是否加载完成
  constructor(public navCtrl:NavController) {

  }

  loadMap() {
    try {
      let map = new AMap.Map('container', {
        view: new AMap.View2D({//创建地图二维视口
          zoom: 11, //设置地图缩放级别
          rotateEnable: true,
          showBuildingBlock: true,
          center: [104.06, 30.67]
        })
      });
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'],
        function () {
          map.addControl(new AMap.ToolBar());

          map.addControl(new AMap.Scale());

          map.addControl(new AMap.OverView({isOpen: true}));
        });
    } catch (err) {
       /*this.mapIsComplete = false;
       this.nativeService.showToast('地图加载失败,请检查网络或稍后再试.')*/
    }
  }

  ionViewDidLoad() {
    this.loadMap();
  }
}

/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
import {Injectable} from '@angular/core';
import {ToastController, LoadingController, Platform} from 'ionic-angular';
import {Camera, AppVersion, Toast, ImagePicker} from 'ionic-native';
declare var LocationPlugin;
declare var AMapNavigation;

@Injectable()
export class NativeService {
  private loading;

  constructor(private platform: Platform,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
  }

  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile() {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid() {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos() {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast = (message: string = '操作完成', duration: number = 2000) => {
    if (this.isMobile()) {
      Toast.show(message, String(duration), 'center').subscribe();
    } else {
      this.toastCtrl.create({
        message: message,
        duration: duration,
        position: 'middle',
        showCloseButton: false
      }).present();
    }
  };


  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading = (content: string = '') => {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
    setTimeout(() => {//最长显示20秒
      this.loading.dismiss();
    }, 20000);
  };

  /**
   * 关闭loading
   */
  hideLoading = () => this.loading.dismiss();

  /**
   * 使用cordova-plugin-camera获取照片的base64
   * @param options
   * @return {Promise<T>}
   */
  getPicture = (options) => {
    return new Promise((resolve, reject) => {
      Camera.getPicture(Object.assign({
        sourceType: Camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
        destinationType: Camera.DestinationType.DATA_URL,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
        quality: 90,//图像质量，范围为0 - 100
        allowEdit: true,//选择图片前是否允许编辑
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 800,//缩放图像的宽度（像素）
        targetHeight: 800,//缩放图像的高度（像素）
        saveToPhotoAlbum: false,//是否保存到相册
        correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
      }, options)).then((imgData) => {
        resolve(imgData);
      }, (err) => {
        console.log(err);
        err == 20 ? this.showToast('没有权限,请在设置中开启权限') : reject(err);
      });
    });
  };

  /**
   * 通过拍照获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByCamera = (options = {}) => {
    return new Promise((resolve) => {
      this.getPicture(Object.assign({
        sourceType: Camera.PictureSourceType.CAMERA
      }, options)).then(imgData => {
        resolve(imgData);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('获取照片失败');
      });
    });
  };


  /**
   * 通过图库获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByPhotoLibrary = (options = {}) => {
    return new Promise((resolve) => {
      this.getPicture(Object.assign({
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      }, options)).then(imgData => {
        resolve(imgData);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消选择图片', 1500) : this.showToast('获取照片失败');
      });
    });
  };


  /**
   * 通过图库多选图片
   * @param options
   * @return {Promise<T>}
   */
  getMultiplePicture = (options = {}) => {
    let that = this;
    let destinationType = options['destinationType'] || 0;//0:base64字符串,1:图片url
    return new Promise((resolve) => {
      ImagePicker.getPictures(Object.assign({
        maximumImagesCount: 6,
        width: 800,//缩放图像的宽度（像素）
        height: 800,//缩放图像的高度（像素）
        quality: 90//图像质量，范围为0 - 100
      }, options)).then(files => {
        if (destinationType === 1) {
          resolve(files);
        } else {
          let imgBase64s = [];//base64字符串数组
          for (let fileUrl of files) {
            that.convertImgToBase64(fileUrl, base64 => {
              imgBase64s.push(base64);
              if (imgBase64s.length === files.length) {
                resolve(imgBase64s);
              }
            }, null);
          }
        }
      }).catch(err => {
        console.error(err);
        this.showToast('获取照片失败');
      });
    });
  };

  // 根据图片绝对路径转化为base64字符串
  convertImgToBase64(url, callback, outputFormat) {
    let canvas = <HTMLCanvasElement>document.createElement('CANVAS'), ctx = canvas.getContext('2d'), img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      let imgBase64 = canvas.toDataURL(outputFormat || 'image/png');//返回如'data:image/jpeg;base64,abcdsddsdfsdfasdsdfsdf'
      let base64 = imgBase64.substring(imgBase64.indexOf(';base64,') + 8);//返回如'abcdsddsdfsdfasdsdfsdf'
      callback.call(this, base64);
      canvas = null;
    };
    img.src = url;
  }

  /**
   * 获得用户当前坐标
   * @return {Promise<T>}
   */
  getUserLocation() {
    return new Promise((resolve, reject) => {
      if (this.isMobile()) {
        LocationPlugin.getLocation(data => {
          resolve({'lng': data.longitude, 'lat': data.latitude});
        }, msg => {
          console.error('定位错误消息' + msg);
          alert(msg.indexOf('缺少定位权限') == -1 ? ('错误消息：' + msg) : '缺少定位权限，请在手机设置中开启');
          reject('定位失败');
        });
      } else {
        console.log('非手机环境,即测试环境返回固定坐标');
        resolve({'lng': 113.350912, 'lat': 23.119495});
      }
    });
  }

  /**
   * 地图导航
   * @param startPoint 开始坐标
   * @param endPoint 结束坐标
   * @param type 0实时导航,1模拟导航,默认为模拟导航
   * @return {Promise<T>}
   */
  navigation(startPoint, endPoint, type = 1) {
    return new Promise((resolve, reject) => {
      if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
        AMapNavigation.navigation({
          lng: startPoint.lng,
          lat: startPoint.lat
        }, {
          lng: endPoint.lng,
          lat: endPoint.lat
        }, type, function (message) {
          resolve(message);//非手机环境,即测试环境返回固定坐标
        }, function (message) {
          alert('导航失败:' + message);
          reject('导航失败');
        });
      } else {
        this.showToast('非手机环境不能导航');
      }
    });
  }

  /**
   *  @name 获取app版本信息demo
   */
  showAppVersion() {
    AppVersion.getAppName().then(value => {
      console.log(value);//ionic2_tabs
    });
    AppVersion.getPackageName().then(value => {
      console.log(value);//com.kit.platform
    });
    AppVersion.getVersionCode().then(value => {
      console.log(value);//1
    });
    AppVersion.getVersionNumber().then(value => {
      console.log(value);//0.0.1
    });
  }

  /**
   * @name 获取网络类型
   */
  getNetworkType() {
    if (!this.isMobile()) {
      return true;
    }
    return navigator['connection']['type'];// "none","wifi","4g","3g","2g"...
  }

  isConnecting() {
    return this.getNetworkType() != 'none';
  }
}

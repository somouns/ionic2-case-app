/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {ModalController} from "ionic-angular";
import {LoginPage} from "../pages/login/login";
import {DEFAULT_AVATAR, FILE_SERVE_URL} from "./Constants";
import {FileService} from "./FileService";

/**
 * Helper类存放和业务有关的公共方法
 * @description
 */
@Injectable()
export class Helper {

  constructor(private modalCtrl: ModalController,
              private storage: Storage,
              private fileService: FileService) {
  }


  /**
   * 打开登录窗口去登录
   * @param callBack
   */
  goLogin(callBack) {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
    modal.onDidDismiss(userInfo => {
      callBack(userInfo);
    });
  }

  /**
   * 根据用户信息获取用户头像
   * @return {string}
   */
  getUserAvatar() {
    return new Promise((resolve) => {
      this.storage.get('UserInfo').then(userInfo => {
        if (!userInfo || !userInfo.avatarId) {
          resolve(DEFAULT_AVATAR);
        } else {
          let avatarId = userInfo.avatarId;//头像id
          let avatarKey = userInfo.id + 'avatar';
          this.storage.get(avatarKey).then(avatarPath => {
            if (avatarPath) {
              resolve(avatarPath);
            } else {
              this.fileService.getFileInfoById(avatarId).then(result => {
                if (result.success) {
                  this.storage.set(avatarKey, FILE_SERVE_URL + result.data.origPath);
                  resolve(FILE_SERVE_URL + result.data.origPath);
                }
              })
            }
          });
        }
      });
    });
  }

}

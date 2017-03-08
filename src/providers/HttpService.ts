/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {NativeService} from './NativeService';

@Injectable()
export class HttpService {

  constructor(private http: Http, private nativeService: NativeService) {
  }

  public get(url: string, paramObj: any) {
    return this.http.get(url + this.toQueryString(paramObj))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public post(url: string, paramObj: any) {
    this.nativeService.showLoading();
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(url, this.toBodyString(paramObj), new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public postBody(url: string, paramObj: any) {
    this.nativeService.showLoading();
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, paramObj, new RequestOptions({headers: headers}))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  /**
   * 请求失败处理函数
   * @param result
   * @return {any}
   */
  private handleSuccess(result) {
    this.nativeService.hideLoading();
    if (result && !result.success) {
      this.nativeService.showToast(result.msg);
    }
    return result;
  }

  /**
   * 请求失败处理函数
   * @param error
   * @return {{success: boolean, msg: string}}
   */
  private handleError(error: Response | any) {
    this.nativeService.hideLoading();
    let msg = '请求失败';
    if (error.status == 400) {
      msg = '请求无效';
      console.log('请检查参数类型是否匹配');
    } else if (error.status == 404) {
      msg = '请求链接不存在，请联系管理员';
      console.error(msg + '，请检查路径是否正确');
    } else if (error.status == 500) {
      msg = '服务器出错，请稍后再试';
    } else if (error.status == 0) {
      msg = '请求地址错误或后台服务未启动';
    }
    if (!this.nativeService.isConnecting()) {
      msg = '没有网络,请求发送失败';
    }
    console.log(error);
    this.nativeService.showToast(msg);
    return {success: false, msg: msg};
  }


  /**
   * 把请求参数转化为参数字符串
   * @param obj　参数对象
   * @return {string}　参数字符串
   * @example
   *  声明: var obj= {'name':'小军',age:23};
   *  调用: toQueryString(obj);
   *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toQueryString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return '?' + ret.join('&');
  }

  /**
   *把请求参数转化为参数字符串
   * @param obj
   * @return {string}
   *  声明: var obj= {'name':'小军',age:23};
   *  调用: toQueryString(obj);
   *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toBodyString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  }

  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

}

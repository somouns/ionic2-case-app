/**
 * Created by yanxiaojun617@163.com on 12-23.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "./HttpService";
import {FILE_SERVE_URL} from './Constants';
import {FileObj} from "../model/FileObj";

@Injectable()
export class FileService {
  constructor(private httpService: HttpService) {
  }

  /**
   * 根据文件id获取文件信息
   * @param id 文件id
   * @return {Promise<TResult|T>}
   */
  getFileInfoById(id: string) {
    return this.httpService.get(FILE_SERVE_URL + '/getById', {id: id});
  }

  /**
   * app上传图片,只支持上传base64字符串
   * @param fileList,数组中的对象必须包含bse64属性
   * @return {Promise<TResult|T>}
   */
  uploadPictures(fileList) {
    return this.httpService.postBody(FILE_SERVE_URL + '/appUpload', fileList);
  }

  /**
   * app上传图片,只支持上传base64字符串
   * @param FileObj,必须包含bse64属性
   * @return {Promise<TResult|T>}
   */
  uploadPicture(FileObj) {
    return this.httpService.postBody(FILE_SERVE_URL + '/appUpload', [FileObj]);
  }

}

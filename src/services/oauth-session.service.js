import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class OauthSessionService {
  static get parameters(){
    return [Http];
  }

  constructor( http ){
    this.http = http;
  }
  login(){

  }
  register( payload ){
    return this.http.post(`/api/session/register`, payload)
      .map( response => response.json() || {})
      .catch(this.handleError)
  }
  resendConfirmEmail(){

  }
  confirmEmail(){

  }
  recoverPassword(){

  }
  isValidToken(){

  }
  changePassword(){

  }
  logout(){

  }
  logoutAllDevices(){

  }

  handleError( error ){
    return Observable.throw({msg: 'error', obj: {}});
  }
}
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class OauthSessionService {
  static get parameters(){
    return [Http];
  }

  constructor( http ){
    this.http = http;
    this.token = null;
  }
  setToken( token ) {
    this.token = token;
  }
  user(token){
    this.token = token;
    let options = new RequestOptions({ headers: new Headers({'Authorization': this.token}) })
    return this.http.get('/api/session/user', options)
      .map(res => res.json() || {});
  }
  login( user ){
    return this.http.post(`/api/session/login`, user)
  }
  register( user ){
    return this.http.post(`/api/session/register`, {user: user})
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
  logout( all ){
    let action = all ? 'log-off-all-devices' : 'logout';
    return this.http.post(`/api/session/${action}`, {}, {headers: new Headers({'Authorization': this.token})})
        .map(res => res.json() || {});
  }

}
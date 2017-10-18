import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OauthSessionService {
  static get parameters(){
    return [Http];
  }
  constructor( http ){
    this.http = http;
    this.token = null;
    this._token = new ReplaySubject(null);
  }
  get authToken(){
    return this._token;
  }
  setToken( token ) {
    this.token = token;
    this._token.next(token);
  }
  user(token){
    let options = new RequestOptions({ headers: new Headers({'Authorization': token}) });
    return this.http.get( '/api/session/user', options)
      .map(res => res.json() || {})
      .toPromise();
  }
  login( user ){
    return this.http.post(`/api/session/login`, user)
  }
  register( user ){
    return this.http.post(`/api/session/register`, {user: user})
  }
  resendConfirmEmail(){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this.token}) })
    return this.http.post(`/api/session/resend-confirm-email`, {}, options).toPromise();
  }
  confirmAccount( token ){
    return this.http.post(`/api/session/confirm-account`, {token: token})
      .toPromise();
  }
  recoverPassword(email){
    return this.http.post(`/api/session/recover-password`, {email: email})
        .map(res => res.json() || {});
  }
  isValidToken( token ){
    return this.http.post(`/api/session/is-valid-token`, {token: token}).toPromise();
  }
  changePassword(token, password){
    return this.http.post(`/api/session/change-password`, {token: token, password: password});
  }
  updatePassword( passwords ) {
    return this.http.post(`/api/session/update-password`, {passwords: passwords},
      {headers: new Headers({'Authorization': this.token})}).toPromise();
  }
  updateGithubToken( token ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this.token}) })
    return this.http.post(`/api/oauth/github`, {git: token}, options).toPromise();
  }
  logout( all ){
    let action = all ? 'log-off-all-devices' : 'logout';
    return this.http.post(`/api/session/${action}`, {}, {headers: new Headers({'Authorization': this.token})});
  }
}
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Rx';
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
    this._authGit = new ReplaySubject(null);
    this._user = new ReplaySubject(null);
  }
  get authToken(){
    return this._token;
  }
  get authGit(){
    return this._authGit;
  }
  setSession( session ) { console.log(session);
    this.token = session.token;
    this._token.next(session.token);
    this._authGit.next(session.github && session.github.joined ? 1 : 0);
    this._user.next( session );
  }
  user(token){
    let options = new RequestOptions({ headers: new Headers({'Authorization': token}) });
    return this.http.get( '/api/session/user', options)
      .map(res => res.json() || {})
      .toPromise();
  }
  login( user ){
    return this.http.post(`/api/session/login`, user)
        .map(res => res.json().user || {})
        .catch( this.handleError )
  }
  register( user ){
    return this.http.post(`/api/session/register`, {user: user})
        .map(res => res.json() || {})
        .catch( this.handleError )
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
    return this.http.post(`/api/session/change-password`, {token: token, password: password})
        .map(res => res.json().user || {})
        .catch( this.handleError );
  }
  updatePassword( passwords ) {
    return this.http.post(`/api/session/update-password`, {passwords: passwords},
      {headers: new Headers({'Authorization': this.token})}).toPromise();
  }
  notifyGithub(){
    this._authGit.next(1);
  }
  updateGithub( username, token ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this.token}) })
    return this.http.post(`/api/oauth/github`, {git: {token: token, username: username}}, options).toPromise();
  }
  logout( all ){
    let action = all ? 'log-off-all-devices' : 'logout';
    return this.http.post(`/api/session/${action}`, {}, {headers: new Headers({'Authorization': this.token})});
  }
  handleError(error){
    return Observable.throw({msg: 'Error', obj: error});
  }
}
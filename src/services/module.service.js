import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OauthSessionService } from './index';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModuleService {
  static get parameters(){
    return [Http, OauthSessionService];
  }
  constructor(http, oauth){
    this.http = http;
    this.token = new ReplaySubject(0);
    this._token = null;
    let _subs = oauth.authToken.subscribe( token => {
      this._token = token;
      this.token.next( token );
    });
  }
  post( payload ) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.post('/api/modules', payload, options)
      .map(res => res.json())
      .toPromise();
  }
  put( id, payload, type ) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/modules/${id}/${type}`, payload, options)
      .map(res => res.json())
      .toPromise();
  }
  remove( id, courseId) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.delete(`/api/modules/${id}?courseId=`+courseId, options)
      .map(res => res.json())
      .toPromise();
  }

  handleError(error){
    return Observable.throw({msg: 'Error', obj: error});
  }
}
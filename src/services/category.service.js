import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OauthSessionService } from './index';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
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
    this.categories = [];
    this.category;
  }
  get currentCategory(){
    return this.category;
  }
  set currentCategory( topic ){
    this.category = topic;
  }
  list( id, edit, token ){
    let options = new RequestOptions({});
    if( this._token || token ) {
      options = new RequestOptions({ headers: new Headers({'Authorization': this._token || token}) })
    }
    return this.http.get('/api/categories' + (id ? '/'+id : '') + (edit ? '?edit' : ''), options)
      .map( res => res.json())
      .catch( this.handleError );
  }
  getPublished(){
    let options = new RequestOptions({});
    if( this._token ) {
      options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) })
    }
    return this.http.get('/api/categories/all', options)
      .map( res => res.json())
      .catch( this.handleError );
  }
  post( payload ) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.post('/api/categories', payload, options)
      .map(res => res.json())
      .toPromise();
  }
  put( id, payload, type ) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/categories/${id}/${type}`, payload, options)
      .map(res => res.json())
      .toPromise();
  }
  remove( id) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.delete(`/api/categories/${id}`, options)
      .map(res => res.json())
      .catch( this.handleError );
  }

  handleError(error){
    return Observable.throw({msg: 'Error', obj: error});
  }
}
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OauthSessionService } from './index';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleFavoriteService {
  static get parameters(){
    return [Http, OauthSessionService];
  }
  constructor(http, oauth){
    this.http = http;
    this._token = null;
    let _subs = oauth.authToken.subscribe( token => {
      this._token = token;
    });
  }
  getFavorites(){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) })
    return this.http.get('/api/articles/favorites', options)
        .map( res => res.json())
  .catch( this.handleError );
  }
  setFavorite( id ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) })
    return this.http.put(`/api/articles/${id}/favorite`, {}, options)
        .map( res => res.json())
  .catch( this.handleError );
  }
  removeFavorite( id ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) })
    return this.http.delete(`/api/articles/${id}/favorite`, options)
        .map( res => res.json())
  .catch( this.handleError );
  }
  handleError(error){
    return Observable.throw({msg: 'Error', obj: error});
  }
}
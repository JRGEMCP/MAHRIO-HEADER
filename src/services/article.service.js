import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OauthSessionService } from './index';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService{
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
      _subs.unsubscribe();
    });
    this.articles = [];
    this.article;
  }
  get currentArticle(){
    return this.article;
  }
  set currentArticle( article ){
    this.article = article;
  }
  gett( link, auth, id ){
    let options = new RequestOptions({});
    if( this._token && auth ) {
      options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) })
    }
    return this.http.get('/api/articles' + (link ? `/${link}` : '')+(!link && id ? '?id='+id:''), options)
      .map( res => res.json())
      .catch( this.handleError );
  }
  post( payload ) { console.log(this._token);
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.post('/api/articles', {article: payload}, options)
      .map(res => res.json())
      .toPromise();
  }
  put( payload ) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/articles/${payload._id}`, {article: payload}, options)
      .map(res => res.json())
      .toPromise();
  }

  handleError(error){
    return Observable.throw({msg: 'Error', obj: error});
  }
}
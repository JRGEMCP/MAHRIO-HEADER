import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OauthSessionService } from './index';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService {
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
    this.articles = [];
    this.article;
    this.topic;
    this.category;
  }
  get currentArticle(){
    return this.article;
  }
  set currentArticle( article ){
    this.article = article;
  }
  get currentFeature(){
    return this.topic;
  }
  set currentFeature(val){
    this.topic = val;
  }
  get currentProduct(){
    return this.category;
  }
  set currentProduct(val){
    this.category = val;
  }
  getPublished(){
    let options = new RequestOptions({});
    if( this._token ) {
      options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) })
    }
    return this.http.get('/api/articles?published=true', options)
        .map( res => res.json())
        .catch( this.handleError );
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
  post( payload ) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.post('/api/articles', {article: payload}, options)
      .map(res => res.json())
      .toPromise();
  }
  put( payload ) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/articles/${payload._id}`, {article: payload.summary}, options)
      .map(res => res.json())
      .toPromise();
  }
  tags( payload ) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/articles/${payload._id}/tags`, {tags: payload.tags}, options)
        .map(res => res.json())
        .toPromise();
  }
  createRepo( id, name, description ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/articles/${id}/repo`, {repo: {name: name, description: description}}, options)
        .map(res => res.json())
        .toPromise();
  }
  createSection( id, payload ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.post(`/api/articles/${id}/sections`, {section: payload}, options)
        .map(res => res.json())
        .toPromise();
  }
  createSectionFiles( id, payload ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/articles/${id}/sections/repo`, {sections: payload}, options)
        .map(res => res.json())
        .toPromise();
  }
  saveSections( id, payload){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/articles/${id}/sections`, {sections: payload.map((pay) => pay.update) }, options)
        .map(res => res.json())
        .toPromise();
  }
  updateSections( id, payload ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/articles/${id}/sections`, {sections: payload}, options)
        .map(res => res.json())
        .toPromise();
  }
  removeSection( id, secId ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.delete(`/api/articles/${id}/section/${secId}`, options)
        .map(res => res.json())
        .toPromise();
  }
  getCodeSha(id){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.get(`/api/articles/${id}/code`, options)
        .map(res => res.json())
        .toPromise();
  }
  createCodeRepo(id){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.post(`/api/articles/${id}/code`, {}, options)
        .map(res => res.json())
        .toPromise();
  }
  updateCodeRepo(id, message, sha, content){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/articles/${id}/code`, {content: content, message: message, sha: sha}, options)
        .map(res => res.json())
        .toPromise();
  }
  publish(id ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/articles/${id}/publish`, {}, options)
        .map(res => res.json())
        .toPromise();
  }


  handleError(error){
    return Observable.throw({msg: 'Error', obj: error});
  }
}
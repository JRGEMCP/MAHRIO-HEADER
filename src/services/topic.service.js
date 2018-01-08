import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OauthSessionService } from './index';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TopicService {
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
    this.topics = [];
    this.topic;
  }
  get currentTopic(){
    return this.topic;
  }
  set currentTopic( topic ){
    this.topic = topic;
  }
  list( auth ){
    let options = new RequestOptions({});
    return this.http.get('/api/topics', options)
        .map( res => res.json())
        .catch( this.handleError );
  }
  post( payload ) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.post('/api/topics', {topic: payload}, options)
        .map(res => res.json())
        .catch( this.handleError );
  }
  put( payload ) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/topics/${payload._id}`, {topic: payload}, options)
        .map(res => res.json())
        .catch( this.handleError );
  }
  remove( id) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.delete(`/api/topics/${id}`, options)
        .map(res => res.json())
        .catch( this.handleError );
  }

  handleError(error){
    return Observable.throw({msg: 'Error', obj: error});
  }
}
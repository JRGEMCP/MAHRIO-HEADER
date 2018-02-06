import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OauthSessionService } from './index';

@Injectable()
export class MediaService{
  static get parameters(){
    return [Http, OauthSessionService];
  }
  constructor(http, oauth){
    this.http = http;
    this.oauth = oauth;
    oauth.authToken.subscribe( token => {
      this._token = token;
    });
  }
  get(){
    return this.http.get('/images')
      .map( res => res.json() || {})
      .toPromise();
  }
  getSignedUrl( url ){
    let options = new RequestOptions({headers: new Headers({ 'Authorization': this._token}) });
    return this.http.get( url, options )
      .map(res => res.json())
      .toPromise()
  }

  uploadToAWS( url, payload){
    let options = new RequestOptions({headers: new Headers({ 'x-amz-acl': 'public-read'}) });
    return this.http.put(url, payload, options)
      .toPromise()
  }

  save( img ){
    let options = new RequestOptions({headers: new Headers({ 'Authorization': this._token}) });
    return this.http.post('/api/images', {image: img}, options)
      .map(res => res.json())
      .toPromise()
  }
  handleError(error){
    return Observable.throw({msg: 'Error', obj: error});
  }
}
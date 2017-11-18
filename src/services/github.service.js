import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OauthSessionService } from './index';

@Injectable()
export class GithubService{
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
  getOrgs(){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.get(`/api/github/orgs`, options)
        .map(res => res.json())
        .toPromise();
  }

  handleError(error){
    return Observable.throw({msg: 'Error', obj: error});
  }
}
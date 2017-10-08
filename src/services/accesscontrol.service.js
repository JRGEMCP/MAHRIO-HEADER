import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AccessControlService {
  static get parameters(){
    return [Http];
  }
  constructor( http ){
    this.http = http;
    this._token = new BehaviorSubject();
  }
  get token(){
    return this._token;
  }
  set token( token ){
    this._token.next( token );
  }
}
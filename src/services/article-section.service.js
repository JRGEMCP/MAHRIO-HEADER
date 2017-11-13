import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SectionService{
  static get parameters(){
    return [Http];
  }
  constructor(http, articleService){
    this.http = http;
    this.section;
  }
  get currentSection(){
    return this.section;
  }
  set currentSection( sec ){
    this.section = sec;
  }
  createRepo( id, name, description ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/articles/${id}/repo`, {repo: {name: name, description: description}}, options)
        .map(res => res.json())
        .toPromise();
  }
  createSections( id, payload ){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.post(`/api/articles/${id}/sections`, payload, options)
        .map(res => res.json())
        .toPromise();
  }
  saveSections( id, payload){
    let options = new RequestOptions({ headers: new Headers({'Authorization': this._token}) });
    return this.http.put(`/api/articles/${id}/sections`, payload, options)
        .map(res => res.json())
        .toPromise();
  }
  handleError(error){
    return Observable.throw({msg: 'Error', obj: error});
  }
}
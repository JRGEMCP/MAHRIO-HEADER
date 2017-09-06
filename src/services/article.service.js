import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService{
  static get parameters(){
    return [Http];
  }
  constructor(http){
    this.http = http;
    this.token = null;
    this.articles = [];
    this.article;
  }
  setToken( token ) {
    this.token = token;
  }
  get currentArticle(){
    return this.article;
  }
  set currentArticle( article ){
    this.article = article;
  }
  gett( link ){
    return this.http.get('/api/articles' + (link ? `/${link}` : ''))
      .map( res => res.json())
      .toPromise();
  }
  post( payload ) {
    let options = new RequestOptions({ headers: new Headers({'Authorization': this.token}) });
    return this.http.post('/api/articles', {article: payload}, options)
      .map(res => res.json())
      .toPromise();
  }

}
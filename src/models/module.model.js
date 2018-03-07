import { Article } from './article.model';
import { Feature } from './feature.model';
import { Validators } from '@angular/forms';

export class Module {
  constructor( courseId, formBuilder ) {
    this._courseId = courseId;

    this._id = '';
    this._title = '';
    this._content = [];

    this._articles = [];
    this._features = [];


    if( formBuilder ) {
      this.loadForm(formBuilder);
    } else {
      this._form = null;
    }
  }

  loadForm( formBuilder ){
    this._form = formBuilder.group({
      title: [this._title || '', Validators.compose([
        Validators.required
      ])]
    });
  }

  get id(){ return this._id; }

  get title(){ return this._title; }
  set title( val ){ this._title = val; }

  get content(){ return this._content; }
  set content( val ){ this._content = val; }

  get articles(){ return this._articles; }
  get features() { return this._features; }

  static fromPayload( payload, fb ){
    const newInstance = new Module();

    newInstance._id = payload._id;
    newInstance._title = payload.title;
    newInstance._content = payload.content;

    payload.articles.forEach( function(article){
      newInstance._articles.push( Article.fromPayload(article) );
    })

    payload.features.forEach( function(feature){
      newInstance.features.push( Feature.fromPayload(feature) );
    })

    if( fb ){ newInstance.loadForm(fb); }
    return newInstance;
  }

  get form(){ return this._form; }
  get payload(){
    return {
      module: {
        title: this._form.controls.title.value
      },
      courseId: this._courseId
    };
  }
  addArticle( item ){
    if( item._id ) {
      item = Article.fromPayload(item);
    }
    this._articles.push( item );
  }
  addFeature( item ){
    if( item._id){
      item = Feature.fromPayload(item);
    }
    this._features.push( item );
  }
}
import { Article } from './article.model';
import { Validators } from '@angular/forms';

export class Feature {
  constructor( formBuilder ) {
    this._id = '';
    this._title = '';
    this._link = '';
    this._body = [];
    this._created = '';
    this._deck = '';
    this._tags = [];
    this._articles = [];
    this._published = false;

    this._fullArticles = [];

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
      ])],
      link: [this._link || '', Validators.compose([
        Validators.required
      ])],
      deck: [this._deck || '', Validators.compose([
        Validators.required
      ])]
    });
  }

  get id(){ return this._id; }

  get title(){ return this._title; }
  set title( val ){ this._title = val; }

  get link(){ return this._link; }
  set link( val ){ this._link = val; }

  get created(){ return this._created; }

  get deck(){ return this._deck; }
  set deck( val ){ this._deck = val; }

  get body(){ return this._body; }
  set body( val ){ this._body = val; }

  get tags(){ return this._tags; }
  set tags(val){ this._tags = val; }
  get tagsArray(){
    let arr = [];
    this._tags.forEach( (item) => {
      arr.push( item );
    });
    return arr;
  }

  get articles(){ return this._articles; }
  set articles(val){ this._articles = val; }
  set currentArticles(val){ this._fullArticles = val; }
  get currentArticles(){ return this._fullArticles; }

  get published(){ return this._published; }
  set published(val){ this._published = !!val; }

  static fromPayload( payload, fb ){
    const newInstance = new Feature();

    newInstance._id = payload._id;
    newInstance._title = payload.title;
    newInstance._link = payload.link;
    newInstance._created = payload.created;
    newInstance._deck = payload.deck;
    newInstance._published = payload.published;

    newInstance._tags = (payload.tags && payload.tags.length ?  new Set(payload.tags) : new Set() );
    newInstance._articles = (payload.articles && payload.articles.length ?  new Set(payload.articles.map(art => art._id)) : new Set() );

    payload.body.forEach( p => {
      let articleId = p.match(/^___link___article___(.*?)___inline___$/);
      if( articleId ) {
        articleId = articleId[1];
        payload.articles.forEach( article => {
          if( article._id == articleId){
            newInstance._body.push( {type: 'article', content: Article.fromPayload(article) });
          }
        })
      } else {
        newInstance._body.push( {type: null, content: p });
      }
    });

    if( fb ){ newInstance.loadForm(fb); }
    return newInstance;
  }

  get form(){ return this._form; }
  get payload(){
    return {
      topic: {
        title: this._form.controls.title.value,
        link: this._form.controls.link.value,
        deck: this._form.controls.deck.value
      }
    };
  }
}
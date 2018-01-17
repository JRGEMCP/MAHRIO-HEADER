import { Section } from './section.model';

export class Article {
  constructor(){
    this._id = '';
    this._title = '';
    this._link = '';
    this._repo = null;
    this._created = '';
    this._deck = '';
    this._tags = [];
    this._favorite = false;
    this._sections = [];
    this._code = '';
    this._state = '';
  }

  get id(){ return this._id; }

  get title(){ return this._title; }
  set title( val ){ this._title = val; }

  get link(){ return this._link; }
  set link( val ){ this._link = val; }

  get repo(){ return this._repo; }
  set repo( val ){ this._repo = val; }

  get code(){ return this._code; }
  set code( val ){ this._code = val; }

  get deck(){ return this._deck; }
  set deck( val ){ this._deck = val; }

  get tagsArray(){
      let arr = [];
      this._tags.forEach( (item) => {
        arr.push( item );
      });
      return arr;
  }
  get tags(){ return this._tags; }
  set tags(val){ this._tags = val; }

  get created(){ return this._created; }
  get sections(){ return this._sections; }
  set sections(val){ this._sections = val; }

  get favorite(){ return this._favorite; }
  set favorite( val ){ return this._favorite = val; }

  get state(){ return this._state; }
  set state( val ){ this._state = val; }

  static fromPayload( payload ){
    const newInstance = new Article();

    newInstance._id = payload._id;
    newInstance._title = payload.title;
    newInstance._link = payload.link;
    newInstance._created = payload.created;
    newInstance._deck = payload.deck;
    newInstance._tags = (payload.tags && payload.tags.length ?  new Set(payload.tags) : new Set() );
    newInstance._repo = payload.repo;
    newInstance._code = payload.code || {git: null, cache: null};
    newInstance._state = payload.state;
    payload.sections.forEach( sec => {
      newInstance._sections.push( Section.fromPayload(sec) );
    });

    return newInstance;
  }

  get summary(){
    return {
      title: this._title,
      link: this._link,
      deck: this._deck
    };
  }
}
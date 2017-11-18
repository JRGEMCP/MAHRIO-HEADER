import { Section } from './section.model';

export class Article {
  constructor(){
    this._id = '';
    this._title = '';
    this._link = '';
    this._repo = null;
    this._created = '';
    this._deck = '';
    this._favorite = false;
    this._sections = [];
  }

  get id(){ return this._id; }

  get title(){ return this._title; }
  set title( val ){ this._title = val; }

  get link(){ return this._link; }
  set link( val ){ this._link = val; }

  get repo(){ return this._repo; }
  set repo( val ){ this._repo = val; }

  get deck(){ return this._deck; }
  set deck( val ){ this._deck = val; }

  get created(){ return this._created; }
  get sections(){ return this._sections; }

  get favorite(){ return this._favorite; }
  set favorite( val ){ return this._favorite = val; }

  static fromPayload( payload ){
    const newInstance = new Article();

    newInstance._id = payload._id;
    newInstance._title = payload.title;
    newInstance._link = payload.link;
    newInstance._created = payload.created;
    newInstance._deck = payload.deck;
    newInstance._repo = payload.repo;
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
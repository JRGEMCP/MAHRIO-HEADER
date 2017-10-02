export class Article {
  constructor(){
    this._title = '';
    this._link = '';
    this._created = '';
    this._deck = '';
  }

  get title(){ return this._title; }
  get link(){ return this._link; }
  get created(){ return this._created; }
  get deck(){ return this._deck; }

  static fromPayload( payload ){
    const newInstance = new Article();

    newInstance._title = payload.title;
    newInstance._link = payload.link;
    newInstance._created = payload.created;
    newInstance._deck = payload.deck;

    return newInstance;
  }
}
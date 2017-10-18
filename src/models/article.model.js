export class Article {
  constructor(){
    this._id = '';
    this._title = '';
    this._link = '';
    this._created = '';
    this._deck = '';
    this._favorite = false;
  }

  get id(){ return this._id; }

  get title(){ return this._title; }
  set title( val ){ this._title = val; }

  get link(){ return this._link; }
  set link( val ){ this._link = val; }

  get deck(){ return this._deck; }
  set deck( val ){ this._deck = val; }

  get created(){ return this._created; }

  get favorite(){ return this._favorite; }
  set favorite( val ){ return this._favorite = val; }

  static fromPayload( payload ){
    const newInstance = new Article();

    newInstance._id = payload._id;
    newInstance._title = payload.title;
    newInstance._link = payload.link;
    newInstance._created = payload.created;
    newInstance._deck = payload.deck;

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
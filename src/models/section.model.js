export class Section {
  constructor(){
    this._id = '';
    this._heading = '';
    this._body = null;
    this._url = '';
    this._created = '';
    this._time = new Date().getTime();
  }

  get id(){ return this._id; }
  set id(val){ this._id = val; }

  get heading(){ return this._heading; }
  set heading( val ){ this._heading = val; }

  get body(){ return this._body; }
  set body( val ){ this._body = val; }

  get url(){ return this._url; }
  set url( val ){ this._url = val; }

  get created(){ return this._created; }
  get time(){ return this._time; }

  static fromPayload( payload ){
    const newInstance = new Section();

    newInstance._id = payload._id;
    newInstance._heading = payload.heading;
    newInstance._body = payload.body;
    newInstance._url = payload.url;
    newInstance._created = payload.created;
    newInstance._time = new Date().getTime();

    return newInstance;
  }

  get summary(){
    return {
      heading: this._heading,
      body: this._body
    };
  }
  get update(){
    return {
      _id: this._id,
      heading: this._heading,
      body: this._body
    }
  }
}
export default class FilterModel {
  constructor( name, type, func){
    this._name = name;
    this._type = type;
    this._function = func;
  }

  get name(){ return this._name; }

  get filter(){ return this._function; }
  set filter( val ){
    this._function = val;
  }

  get isOr(){ return this._type === 'OR'; }
  get isAnd(){ return this._type === 'AND'; }

}
import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {
  constructor(){
    this._items = [];

    this._pageIndex = 0;
    this._pageSize = 5;
    this._pageCount = 0;
    this._pageNumbers = [];
    this._numbersCount = 3;
  }

  get page(){
    return this._items.slice(
      this._pageIndex * this._pageSize,
      (this._pageIndex + 1) * this._pageSize
    )
  }
  get items(){ return this._items; }
  set items( val ) {
    this._items = val;
    this._pageCount = Math.ceil(this._items.length / this._pageSize);
    this._pageNumbers = Array(this._pageCount).fill(0).map((_,i) => i + 1);
  }

  get index(){ return this._pageIndex; }
  set index( val ){ this._pageIndex = val; }

  get size(){ return this._pageSize; }
  set size( val ){
    this._pageSize = val;
    this._pageCount = Math.ceil( this._items.length / this._pageSize );
    this._pageNumbers = Array( this._pageCount).fill(0).map( (_,i) => i + 1);
  }
  get pages(){ return this._pageCount; }
  get pageNumbers(){
    if( this._pageCount <= this._numbersCount){
      return this._pageNumbers;
    }

    let startIndex = 0;
    let endIndex = 0;

    if( this._pageIndex < Math.ceil( this._numbersCount / 2) ){
      startIndex = 0;
      endIndex = this._numbersCount;
    } else if( this._pageIndex > this._pageCount - Math.ceil(this._numbersCount /2)){
      startIndex = this._pageCount - this._numbersCount;
      endIndex = this._pageCount;
    } else {
      startIndex = this._pageIndex - (Math.ceil(this._numbersCount / 2)-1);
      endIndex = this._pageIndex + Math.ceil( this._numbersCount / 2);
    }

    return this._pageNumbers.slice(startIndex, endIndex);
  }

  get isLast(){ return this._pageCount > 0 ? this._pageIndex === this._pageCount - 1 : true; }
  get isFirst(){ return this._pageIndex === 0; }
  get hasNext(){ return this._pageCount > 0 ? this._pageIndex < this._pageCount - 1 : false; }
  get hasPrev(){ return this._pageIndex > 0; }

  isPage( index ){
    return this._pageIndex === index;
  }

  next(){
    if( this._pageIndex < this._pageCount - 1){
      this._pageIndex += 1;
    }
  }
  prev(){
    if( this._pageIndex > 0){
      this._pageIndex -= 1;
    }
  }
  setPage(index){
    if( index < this._pageCount && index >= 0){
      this._pageIndex = index;
    }
  }
  first(){
    this._pageIndex = 0;
  }
  last(){
    this._pageIndex = this._pageCount - 1;
  }



}
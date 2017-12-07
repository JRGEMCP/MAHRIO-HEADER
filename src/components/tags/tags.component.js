import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../../services';
import { validTag } from '../../validators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

var tagz = [
  'discover',
  'define',
  'design',
  'develop',
  'deploy',
  'collect',
  'transmit',
  'store',
  'analyze',
  'control',
  'share',
  'database',
  'mongodb',
  'angular',
  'client',
  'browser',
  'chrome',
  'hapi',
  'server',
  'node',
  'javascript',
  'raspberry',
  'iot',
  'camera',
  'hardware',
  'software',
  'arduino',
  'digital',
  'analog',
  'sound',
  'sensor',
  'internet',
  'sockets',
  'http',
  'mobile',
  'ionic',
  'oauth'
];

import template from './tags.template.html';
import style from './tags.style.scss';

@Component({
  selector: 'form-tags',
  template,
  styles: [style],
  inputs: ['tags'],
  outputs: ['changed']
})

export class FormTagsComponent {
  static get parameters(){
    return [FormBuilder, ArticleService]
  }
  constructor( fb, articleService ){
    this.changed = new EventEmitter();
    this._form = fb.group({
      tag: ['', Validators.compose([
        validTag()
      ])]
    });
    this.tags = [];
    this.articleService = articleService;
  }

  get form(){ return this._form; }
  get isTag_valid(){ return this._form.controls.tag.valid; }
  get tagHasInvalidChar(){ return this._form.controls.tag.hasError('invalidChar'); }
  get wasTag_touched(){ return this._form.controls.tag.touched; }

  removeTag( val ){
    this.tags.delete( val );
    this.changed.emit( this.setToArray(this.tags) );
  }
  onSubmit(){
    this.tags = !this.tags ? new Set() : this.tags
    this.tags.add( this._form.get('tag').value );
    this._form.reset();
    this.changed.emit( this.setToArray(this.tags) );
  }
  search( text$ ){
    return text$
      .debounceTime(200)
      .map(term => term === '' ? []
          : tagz.filter(v => new RegExp(term, 'gi').test(v)).slice(0, 10));
  }

  selectItem(event) {
    const item = event.item;
    this.tags = !this.tags ? new Set() : this.tags
    this.tags.add( item );
    this._form.reset();
    this.changed.emit( this.setToArray(this.tags) );
  }
  setToArray( aSet ){
    let arr = [];
    aSet.forEach( (item) => {
      arr.push( item );
    });
    return arr;
  }
}

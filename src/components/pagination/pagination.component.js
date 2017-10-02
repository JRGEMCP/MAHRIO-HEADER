import { Component, EventEmitter } from '@angular/core';

import template from './pagination.template.html';
import style from './pagination.style.scss';


@Component({
  selector: 'paginate',
  template,
  styles: [style],
  inputs: ['page'],
  outputs: ['change']
})

export class PaginationComponent {
  constructor(){
    this.change = new EventEmitter();
  }
  changes( type, num ) {
    this.change.emit( {type: type, num: num} );
  }
}
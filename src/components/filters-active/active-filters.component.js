import { Component, EventEmitter } from '@angular/core';

import template from './active-filters.template.html';
import style from './active-filters.style.scss';

@Component({
  selector: 'active-filters',
  template,
  styles: [style],
  inputs: ['page'],
  outputs: ['change']
})

export class ActiveFiltersComponent {
  constructor(){
    this.filters = ['Deployed'];
    this.change = new EventEmitter();
  }
  changes( type ){
    this.change.emit({type: type});
  }
}
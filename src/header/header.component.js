import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';

import template from './header.template.html';
import style from './header.style.scss';


@Component({
  selector: 'header-as-a-service',
  template,
  styles: [style],
  outputs: ['auth'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent {

  constructor( ){
    this.auth = new EventEmitter();
  }
  proxyAuth( state ){
    this.isLoggedIn = state ? true : false;
    this.auth.emit(state);
  }
}
import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';

import template from './header.template.html';
import style from './header.style.scss';

@Component({
  selector: 'header-as-a-service',
  template,
  styles: [style],
  inputs: ['clear'],
  outputs: ['auth', 'socket'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent {

  constructor( ){
    this.auth = new EventEmitter();
    this.socket = new EventEmitter();
    this.isLoggedIn = false;

  }
  proxyAuth( state ){
    console.log( state);
    this.isLoggedIn = state ? true : false;
    this.auth.emit(state);
  }
}
import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';

import template from './header.template.html';
import style from './header.style.scss';


@Component({
  selector: 'header-as-a-service',
  template,
  styles: [style],
  outputs: [],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent {

  constructor( ){

  }
  auth( state ){
    this.isLoggedIn = state;
  }
}
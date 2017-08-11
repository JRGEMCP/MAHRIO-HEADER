import { Component, EventEmitter } from '@angular/core';

import template from './header.template.html';
import style from './header.style.scss';


@Component({
  selector: 'header-as-a-service',
  template,
  styles: [style],
  outputs: []
})

export class HeaderComponent {

  constructor( ){

  }
  auth( state ){
    this.isLoggedIn = state;
  }
}
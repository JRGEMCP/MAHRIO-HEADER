import { Component } from '@angular/core';

import template from './sub-header.template.html';
import style from './sub-header.style.scss';

@Component({
  selector: 'sub-header',
  template,
  styles: [ style ]
})

export class SubHeaderComponent {
  static get parameters(){
    return [];
  }

  constructor(){

  }
  ngOnInit(){

  }


}


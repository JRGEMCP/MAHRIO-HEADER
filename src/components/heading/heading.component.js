import { Component } from '@angular/core';

import template from './heading.template.html';
import style from './heading.style.scss';

@Component({
  selector: 'heading',
  template,
  styles: [style],
  inputs: ['h','p','s']
})

export class HeadingComponent {
  constructor(){

  }
}
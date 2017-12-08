import { Component } from '@angular/core';

import template from './heading-bar.template.html';
@Component({
  selector: 'heading-bar',
  template,
  inputs: ['title']
})

export class HeadingBarComponent {
  constructor(){

  }
}
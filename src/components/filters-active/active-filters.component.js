import { Component } from '@angular/core';

import template from './active-filters.template.html';
import style from './active-filters.style.scss';

@Component({
  selector: 'active-filters',
  template,
  styles: [style]
})

export class ActiveFiltersComponent {
  constructor(){
    this.filters = ['Deployed'];
  }
}
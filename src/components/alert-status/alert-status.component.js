import { Component } from '@angular/core';

import template from './alert-status.template.html';
import style from './alert-status.style.scss';

@Component({
  selector: 'alert-status',
  template,
  styles: [style],
  inputs: [ 'type', 'msg']
})

export class AlertStatusComponent {
  constructor(){

  }
}
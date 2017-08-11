import { Component, EventEmitter } from '@angular/core';
import template from './confirm-account.template.html';

@Component({
  selector: 'confirm-account',
  template,
  outputs: ['done']
})

export class ConfirmAccountComponent {
  constructor(){
    this.done = new EventEmitter();
  }

  close(){
    this.done.emit();
  }
}
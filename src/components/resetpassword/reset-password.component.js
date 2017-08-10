import { Component, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import template from './reset-password.template.html';

@Component({
  selector: 'reset-password',
  template,
  outputs: ['go']
})

export class ResetPasswordComponent {

  static get parameters(){
    return [Http];
  }

  constructor(Http){
    this.http = Http;
    this.go = new EventEmitter();
  }

  ngOnInit(){
  }

  goTo( state ) {
    this.go.emit( state );
  }

}


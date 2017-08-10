import { Component, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import template from './login.template.html';

@Component({
  selector: 'login',
  template,
  outputs: ['go']
})

export class LoginComponent {

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


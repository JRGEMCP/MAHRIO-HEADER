import { Component, EventEmitter } from '@angular/core';
import template from './login.template.html';

import { OauthSessionService } from '../../services';

@Component({
  selector: 'login',
  template,
  outputs: ['go','access']
})

export class LoginComponent {

  static get parameters(){
    return [OauthSessionService];
  }

  constructor(OauthSessionService){
    this.session = OauthSessionService;
    this.go = new EventEmitter();
    this.access = new EventEmitter();
    this.user = {};
  }

  ngOnInit(){
  }

  goTo( state ) {
    this.go.emit( state );
  }

  login(){
    this.session.login(this.user)
      .subscribe( res => {
        this.session.setToken( res.headers.get('authorization') );
        localStorage.Authorization = res.headers.get('authorization');
        this.access.emit( );
      }, err => {
          console.log('err: '+err)
      });
  }
}


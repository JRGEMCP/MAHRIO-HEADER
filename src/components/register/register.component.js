import { Component, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import template from './register.template.html';

import { OauthSessionService } from '../../services';

@Component({
  selector: 'register',
  template,
  outputs: ['go', 'access']
})

export class RegisterComponent {

  static get parameters(){
    return [OauthSessionService];
  }

  constructor(OauthSessionService){
    this.session = OauthSessionService;
    this.go = new EventEmitter();
    this.access = new EventEmitter();
    this.user = {};
  }

  goTo( state ) {
    this.go.emit( state );
  }

  register(){
    this._subs = this.session.register(this.user)
      .subscribe( res => {
        this.session.setToken( res.headers.get('authorization') );
        localStorage.Authorization = res.headers.get('authorization');
        this.access.emit( );
      }, err => {
        console.log('err: '+err)
    });
  }
  ngOnDestroy(){
    if( this._subs ) { this._subs.unsubscribe(); }
  }
}


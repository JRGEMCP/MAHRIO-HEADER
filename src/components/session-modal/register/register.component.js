import { Component, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import template from './register.template.html';

import { OauthSessionService, NotificationService } from '../../../services';
import { Notice } from '../../../models';

@Component({
  selector: 'register',
  template,
  outputs: ['go', 'access']
})

export class RegisterComponent {

  static get parameters(){
    return [OauthSessionService, NotificationService];
  }

  constructor(OauthSessionService, NotificationService){
    this.session = OauthSessionService;
    this.notice = NotificationService;
    this.go = new EventEmitter();
    this.access = new EventEmitter();
    this.user = {};
  }

  goTo( state ) {
    this.go.emit( state );
  }

  register(){
    this._subs = this.session.register(this.user)
      .subscribe( user => {
        localStorage.Authorization = user.token;
        this.session.setSession( user );
        this.access.emit( user );
        this.notice.addNotice( new Notice() );
      }, err => {
        console.log('err: '+err)
    });
  }
  ngOnDestroy(){
    if( this._subs ) { this._subs.unsubscribe(); }
  }
}


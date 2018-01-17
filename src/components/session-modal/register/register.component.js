import { Component, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import template from './register.template.html';

import { OauthSessionService, NotificationService } from '../../../services';
import { Notice } from '../../../models';
import { FormBuilder } from '@angular/forms';
import { Session } from '../../../models';

@Component({
  selector: 'register',
  template,
  outputs: ['go', 'access']
})

export class RegisterComponent {

  static get parameters(){
    return [OauthSessionService, NotificationService, FormBuilder ];
  }

  constructor(OauthSessionService, NotificationService, FormBuilder ){
    this.session = OauthSessionService;
    this.notice = NotificationService;
    this.go = new EventEmitter();
    this.access = new EventEmitter();
    this.user = new Session( FormBuilder )
  }

  goTo( state ) {
    this.go.emit( state );
  }

  register(){
    this._subs = this.session.register(this.user.payload)
      .subscribe( user => {
        localStorage.Authorization = user.token;
        this.session.setSession( user );
        this.access.emit( user );
        this.notice.addNotice( new Notice() );
      }, err => {
        this.showError();
    });
  }
  showError(){
    this.type = 'danger';
    this.msg = 'We are having trouble registering'
  }
  ngOnDestroy(){
    if( this._subs ) { this._subs.unsubscribe(); }
  }
}


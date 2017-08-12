import { Component, EventEmitter } from '@angular/core';
import template from './login.template.html';

import { OauthSessionService, NotificationService } from '../../../services';

@Component({
  selector: 'login',
  template,
  outputs: ['go','access']
})

export class LoginComponent {

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

  ngOnInit(){
  }

  goTo( state ) {
    this.go.emit( state );
  }

  login(){
    this._subs = this.session.login(this.user)
      .subscribe( res => {
        this.session.setToken( res.headers.get('authorization') );
        localStorage.Authorization = res.headers.get('authorization');
        this.access.emit( );
        if( !res.confirmed ) { this.notice.addNotice('Not Confirmed'); }
      }, err => {
          console.log('err: '+err)
      });
  }
  ngOnDestroy(){
    if( this._subs ) { this._subs.unsubscribe(); }
  }
}


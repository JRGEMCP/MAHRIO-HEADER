import { Component, EventEmitter } from '@angular/core';
import template from './login.template.html';

import { OauthSessionService, NotificationService } from '../../../services';
import { Notice } from '../../../models';
import { FormBuilder } from '@angular/forms';

import { SessionModalComponent } from '../../session-modal/session-modal.component';
import { Session } from '../../../models';

@Component({
  selector: 'login',
  template,
  outputs: ['go','access']
})

export class LoginComponent {

  static get parameters(){
    return [OauthSessionService, NotificationService, FormBuilder];
  }

  constructor(OauthSessionService, NotificationService, FormBuilder){
    this.session = OauthSessionService;
    this.notice = NotificationService;
    this.go = new EventEmitter();
    this.access = new EventEmitter();
    this.user = new Session( FormBuilder );
  }

  ngOnInit(){
  }

  goTo( state ) {
    this.go.emit( state );
  }

  login(){
    if( !this.user.form.valid ){
      this.showError();
      return;
    }
    this._subs = this.session.login(this.user.payload)
      .subscribe( user => {
        localStorage.Authorization = user.token;
        this.session.setSession( user );
        this.access.emit( user );
        //if( !res.json().confirmed ) { this.notice.addNotice( new Notice({modal: this.ngbModal, component: SessionModalComponent, state: 'confirm-account-retry'}) ); }
      }, err => {
          this.showError();
          this.user.form.reset();
      });
  }
  showError(){
    this.type = 'danger';
    this.msg = 'Username and/or password incorrect.'
  }
  ngOnDestroy(){
    if( this._subs ) { this._subs.unsubscribe(); }
  }
}


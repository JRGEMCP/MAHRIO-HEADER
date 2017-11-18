import { Component, EventEmitter } from '@angular/core';
import template from './login.template.html';

import { OauthSessionService, NotificationService } from '../../../services';
import { Notice } from '../../../models';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionModalComponent } from '../../session-modal/session-modal.component';

@Component({
  selector: 'login',
  template,
  outputs: ['go','access']
})

export class LoginComponent {

  static get parameters(){
    return [OauthSessionService, NotificationService, NgbModal];
  }

  constructor(OauthSessionService, NotificationService){
    this.ngbModal = NgbModal;
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
      .subscribe( user => {

        localStorage.Authorization = user.token;
        this.session.setSession( user );
        this.access.emit( user );
        //if( !res.json().confirmed ) { this.notice.addNotice( new Notice({modal: this.ngbModal, component: SessionModalComponent, state: 'confirm-account-retry'}) ); }
      }, err => {
          console.log('err: '+err)
      });
  }
  ngOnDestroy(){
    if( this._subs ) { this._subs.unsubscribe(); }
  }
}


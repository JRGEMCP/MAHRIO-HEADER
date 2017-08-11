import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import template from './session.template.html';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionModalComponent } from '../session-modal/session-modal.component';

import { OauthSessionService } from '../../services';

@Component({
  selector: 'session',
  template,
  outputs: ['auth']
})

export class SessionComponent {
  static get parameters(){
    return [NgbModal, ActivatedRoute, OauthSessionService];
  }
  constructor(ngbModal, activateRoute, oauthSession){
    this.ngbModal = ngbModal;
    this.route = activateRoute;
    this.route.queryParams.subscribe(params => {
      if( params['token'] ) {
        this.session.isValidToken( params['token'] )
          .then( res => {
              this.sessionInit('recover-password-update', params['token']);
          }, err => { })
      } else if( params['confirm'] ) {
        this.session.confirmAccount( params['confirm'] )
          .then( res => {
            this.sessionInit('confirm-account');
          })
      }
    });
    this.session = oauthSession;
    this.authToken = localStorage.Authorization ? localStorage.Authorization : null;
    this.auth = new EventEmitter();
  }
  ngOnInit(){
    if( this.authToken ) {
      this.loading = true;
      this.session.user(this.authToken)
        .subscribe(res => {
          this.loading = false;
          this.account = true;
          this.auth.emit(true);
        }, err => {
          delete localStorage.Authorization;
          this.loading = false;
        });
    }
  }
  sessionInit( state, token ){
    delete this.accountMenu;

    this.modalRef = this.ngbModal.open( SessionModalComponent )
    this.modalRef.componentInstance.state = state;
    this.modalRef.componentInstance.token = token || null;
    this.modalRef.result
      .then( (result) => {
        if( result ) { this.account = result; this.auth.emit(true); }
        delete this.isCollapsed;
      }, (reason) => {  });
  }

  logoutAll( all ) {
    this.session.logout( all )
      .subscribe( res => {
        this.account = false;
        delete localStorage.Authorization;
        delete this.isCollapsed;
        this.auth.emit(false);
      }, err => { });
  }
}
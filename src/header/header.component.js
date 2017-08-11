import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import template from './header.template.html';
import style from './header.style.scss';

import { OauthSessionService } from '../services';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionComponent } from '../components/session/session.component';

@Component({
  selector: 'header-as-a-service',
  template,
  styles: [style],
  outputs: ['auth']
})

export class HeaderComponent {

  static get parameters(){
    return [NgbModal, OauthSessionService, ActivatedRoute];
  }
  constructor( ngbModal, oauthSession, activateRoute ){
    this.ngbModal = ngbModal;
    this.session = oauthSession;
    this.route = activateRoute;
    this.authToken = localStorage.Authorization ? localStorage.Authorization : null;
    this.auth = new EventEmitter();
    this.route.queryParams.subscribe(params => {
      if( params['token'] ) {
        this.session.isValidToken( params['token'] )
          .then( res => {
            this.sessionInit('recover-password-update', params['token']);
          }, err => {

          })
      } else if( params['confirm'] ) {
        this.session.confirmAccount( params['confirm'] )
          .then( res => {
            this.sessionInit('confirm-account');
          })
      }
    });
  }

  ngOnInit(){
    if( this.authToken ) {
      this.loading = true;
      this.session.user(this.authToken)
        .subscribe(res => {
          this.loading = false;
          this.account = true;
        }, err => {
          delete localStorage.Authorization;
          this.loading = false;
        });
    }
  }

  sessionInit( state, token ){
    delete this.isCollapsed;
    this.modalRef = this.ngbModal.open( SessionComponent )
    this.modalRef.componentInstance.state = state;
    this.modalRef.componentInstance.token = token || null;
    this.modalRef.result
      .then( (result) => {
          this.account = result;
          delete this.accountMenu;
          delete this.isCollapsed;
      }, (reason) => {  });
  }

  logoutAll( all ) {
    this.session.logout( all )
      .subscribe( res => {
        this.account = false;
        delete localStorage.Authorization;
        delete this.isCollapsed;
      }, err => {

      });
  }

}
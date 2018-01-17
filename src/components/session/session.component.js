import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import template from './session.template.html';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionModalComponent } from '../session-modal/session-modal.component';

import { OauthSessionService, NotificationService, GithubService } from '../../services';
import { Notice } from '../../models';

@Component({
  selector: 'session',
  template,
  outputs: ['auth']
})

export class SessionComponent {
  static get parameters(){
    return [NgbModal, ActivatedRoute, OauthSessionService, NotificationService, GithubService];
  }
  constructor(ngbModal, activateRoute, oauthSession, notificationService, githubService){
    this.ngbModal = ngbModal;
    this.route = activateRoute;
    this.notice = notificationService;
    this.github = githubService;
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
    this.profile = {github: {}};
  }
  ngOnInit(){
    if( this.authToken ) {
      this.loading = true;
      this.session.user(this.authToken)
        .then(user => {
          user.token = this.authToken;
          this.session.setSession( user );
          this.loading = false;
          this.account = true;
          this.profile = user;
          this.auth.emit(this.authToken);
          if( !user.confirmed ) { this.notice.addNotice( new Notice({modal: this.ngbModal, title: 'Unconfirmed Account', component: SessionModalComponent, state: 'confirm-account-retry'}) ); }
          // GITHUB ORGS
          if( this.profile.github && this.profile.github.token ) {
            this.github.getOrgs().then( () => { }, err => { });
          }
        }, err => {
          delete localStorage.Authorization;
          this.loading = false;
          this.auth.emit(false);
        });
    } else {
      this.auth.emit(false);
    }
  }
  sessionInit( state, token ){
    delete this.accountMenu;

    this.modalRef = this.ngbModal.open( SessionModalComponent )
    this.modalRef.componentInstance.state = state;
    this.modalRef.componentInstance.token = token || null;
    this.modalRef.result
      .then( (profile) => {
        if( profile ) { this.account = true; this.auth.emit(profile.token); }
        //this.session.setSession( {token: profile.token, user: profile.user} );

        if( this.profile.github && this.profile.github.token ) {
          this.github.getOrgs().then( () => {
            alert('is part of org');
          }, err => {
            alert('not part of org');
          });
        }
        this.profile = profile;
        console.log( this.profile );
        delete this.isCollapsed;
      }, (reason) => {  });
  }

  logoutAll( all ) {
    this.session.logout( all )
      .subscribe( res => {
        this.account = false;
        delete localStorage.Authorization;
        delete this.isCollapsed;
        this.auth.emit(null);
        this.notice.clearAll();
      }, err => { });
  }
}
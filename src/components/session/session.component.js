import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import template from './session.template.html';

import { BsModalService } from 'ngx-bootstrap/modal';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionModalComponent } from '../session-modal/session-modal.component';
import { AccessControlService } from '../../services/accesscontrol.service';
import { OauthSessionService, NotificationService, GithubService } from '../../services';
import { Notice } from '../../models';

@Component({
  selector: 'session',
  template,
  outputs: ['auth']
})

export class SessionComponent {
  static get parameters(){
    return [BsModalService, ActivatedRoute, Router, OauthSessionService, NotificationService, GithubService, AccessControlService];
  }
  constructor(bsModalService, activateRoute, router, oauthSession, notificationService, githubService, accessControlService){
    this.bsModalService = bsModalService;
    this.route = activateRoute;
    this.router = router;
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
    this.access = accessControlService;
  }
  ngOnInit(){
    if( this.authToken ) {
      this.loading = true;
      this.session.user(this.authToken)
        .then(user => {
          this.access.loggedIn.next( true );
          user.token = this.authToken;
          this.session.setSession( user );
          this.loading = false;
          this.account = true;
          this.profile = user;
          this.auth.emit(this.authToken);
          if( !user.confirmed ) { this.notice.addNotice( new Notice({modal: this.bsModalService, title: 'Unconfirmed Account', component: SessionModalComponent, state: 'confirm-account-retry'}) ); }
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

    this.bsModalService.onHide.subscribe((reason) => {
      const _reason = reason ? `, dismissed by ${reason}` : '';
      console.log(`onHide event has been fired${_reason}`);


      if( this.modalRef.content.user ){
        console.log( this.modalRef.content.user );
        this.profile = this.modalRef.content.user;
        this.account = true;
        //this.session.setSession( {token: this.profile.token, user: this.profile} );
        this.session.setSession( this.profile );
        this.auth.emit(this.profile.token);
        if( this.profile.github && this.profile.github.token ) {
          this.github.getOrgs().then( () => {
            console.log('is part of org');
          }, err => {
            console.log('not part of org');
          });
        }

        delete this.isCollapsed;
      }
    });
  }
  sessionInit( state, token ){
    delete this.accountMenu;

    this.modalRef = this.bsModalService.show( SessionModalComponent );
    this.modalRef.content.state = state;
    this.modalRef.content.token = token || null;

    //this.bsModalService.onHide()

    // this.modalRef.result
    //   .then( (profile) => {
    //     console.log(profile);
        // if( profile ) { this.account = true; this.auth.emit(profile.token); }
        // //this.session.setSession( {token: profile.token, user: profile.user} );
        //
        // if( this.profile.github && this.profile.github.token ) {
        //   this.github.getOrgs().then( () => {
        //     alert('is part of org');
        //   }, err => {
        //     alert('not part of org');
        //   });
        // }
        // this.profile = profile;
        // console.log( this.profile );
        // delete this.isCollapsed;
      // }, (reason) => {  console.log('reason'); });
  }

  logoutAll( all ) {
    this.session.logout( all )
      .subscribe( res => {
        if( this.router.url.indexOf('dashboard') !== -1 || this.router.url.indexOf('instructor') !== -1 ) {
          this.router.navigate(['/']);
        }
        this.access.loggedIn = false;
        this.account = false;
        delete localStorage.Authorization;
        delete this.isCollapsed;
        this.auth.emit(null);
        this.notice.clearAll();
      }, err => { });
  }
}
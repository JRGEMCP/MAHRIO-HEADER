import { Component, EventEmitter } from '@angular/core';

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
    return [NgbModal, OauthSessionService];
  }
  constructor( ngbModal, oauthSession ){
    this.ngbModal = ngbModal;
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
        }, err => {
          delete localStorage.Authorization;
          this.loading = false;
        });
    }
  }

  sessionInit( state ){
    this.modalRef = this.ngbModal.open( SessionComponent )
    this.modalRef.componentInstance.state = state;
    this.modalRef.result
      .then( (result) => {
          this.account = result;
          delete this.accountMenu;
      });
  }

  logoutAll( all ) {
    this.session.logout( all )
      .subscribe( res => {
        this.account = false;
        delete localStorage.Authorization;
      }, err => {

      });
  }

}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import template from './session-modal.template.html';

@Component({
  selector: 'session-modal',
  template,
  inputs: ['state', 'token']
})

export class SessionModalComponent {

  static get parameters(){
    return [BsModalRef, Router];
  }
  constructor(BsModalRef, Router){
    this.bsModalRef = BsModalRef;
    this.user = null;
    this.router = Router;
  }

  ngOnInit(){
  }

  goTo( state ) {
    this.state = state;
  }
  auth( user ){
    this.user = user;
    this.bsModalRef.hide( );
    //window.location.href = '/dashboard/';
    this.router.navigate(['/dashboard']);
  }
}


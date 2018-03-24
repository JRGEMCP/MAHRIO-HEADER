import { Component } from '@angular/core';
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
    return [BsModalRef];
  }
  constructor(BsModalRef){
    this.bsModalRef = BsModalRef;
  }

  ngOnInit(){
  }

  goTo( state ) {
    this.state = state;
  }
  auth( user ){
    this.bsModalRef.hide( user );
    window.location.href = '/dashboard/';
  }

}


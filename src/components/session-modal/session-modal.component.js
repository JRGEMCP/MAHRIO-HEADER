import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import template from './session-modal.template.html';

@Component({
  selector: 'session-modal',
  template,
  inputs: ['state', 'token']
})

export class SessionModalComponent {

  static get parameters(){
    return [NgbActiveModal];
  }
  constructor(NgbActiveModal){
    this.activeModal = NgbActiveModal;
  }

  ngOnInit(){
  }

  goTo( state ) {
    this.state = state;
  }
  auth( token ){
    this.activeModal.close(token);
    window.location.href = '/dashboard/';
  }

}


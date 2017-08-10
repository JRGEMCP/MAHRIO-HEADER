import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import template from './session.template.html';

@Component({
  selector: 'session',
  template,
  inputs: ['state', 'token']
})

export class SessionComponent {

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
  auth(){
    this.activeModal.close(true);
  }

}


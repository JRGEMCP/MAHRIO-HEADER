import { Component, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionComponent } from '../components/session/session.component';

import template from './header.template.html';
import style from './header.style.scss';

@Component({
  selector: 'header-as-a-service',
  template,
  styles: [style],
  outputs: ['auth']
})

export class HeaderComponent {

  static get parameters(){
    return [NgbModal];
  }
  constructor( ngbModal ){
    this.ngbModal = ngbModal;
    this.links = [
      {
        href: '/',
        text: 'Mahr.io'
      }
    ];
    this.auth = new EventEmitter();
  }

  session( state ){
    this.modalRef = this.ngbModal.open( SessionComponent );
    this.modalRef.componentInstance.state = state;
  }

}
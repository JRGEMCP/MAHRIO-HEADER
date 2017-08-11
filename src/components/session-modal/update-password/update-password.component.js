import { Component, EventEmitter } from '@angular/core';
import template from './update-password.template.html';

import { OauthSessionService } from '../../../services';

@Component({
  selector: 'update-password',
  template
})

export class UpdatePasswordComponent {
  static get parameters(){
    return [OauthSessionService];
  }
  constructor(OauthSessionService){
    this.session = OauthSessionService;
    this.passwords = {};
  }
  updatePassword(){
    this.session.updatePassword( this.passwords )
      .then( res => {
        this.success = true;
      }, err => {

      });
  }
}
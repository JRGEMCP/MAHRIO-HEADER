import { Component, EventEmitter } from '@angular/core';
import template from './recover-password-update.template.html';

import { OauthSessionService } from '../../../services';

@Component({
  selector: 'recover-password-update',
  template,
  inputs: ['token'],
  outputs: ['access']
})

export class RecoverPasswordUpdateComponent {
  static get parameters(){
    return [OauthSessionService];
  }
  constructor(OauthSessionService){
    this.session = OauthSessionService;
    this.access = new EventEmitter();
  }
  changePassword(){
    this.session.changePassword(this.token, this.password)
      .subscribe( res => {
        localStorage.Authorization = res.user.token;
        this.session.setSession( res.user );
        this.access.emit( res.user );
      })
  }
}
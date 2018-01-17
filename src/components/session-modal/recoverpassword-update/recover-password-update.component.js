import { Component, EventEmitter } from '@angular/core';
import template from './recover-password-update.template.html';

import { OauthSessionService } from '../../../services';
import { FormBuilder } from '@angular/forms';
import { Session } from '../../../models';

@Component({
  selector: 'recover-password-update',
  template,
  inputs: ['token'],
  outputs: ['access']
})

export class RecoverPasswordUpdateComponent {
  static get parameters(){
    return [OauthSessionService, FormBuilder];
  }
  constructor(OauthSessionService, FormBuilder){
    this.session = OauthSessionService;
    this.access = new EventEmitter();
    this.user = new Session( FormBuilder );
  }
  changePassword(){
    this.session.changePassword(this.token, this.user.password)
      .subscribe( res => {
        localStorage.Authorization = 'Bearer ' + res.token;
        this.session.setSession( res );
        this.access.emit( res );
      }, () => {
        this.type = 'danger';
        this.msg = 'Please try to reset your password again'
      })
  }
}
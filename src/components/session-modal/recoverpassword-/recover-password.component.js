import { Component, EventEmitter } from '@angular/core';
import template from './recover-password.template.html';

import { OauthSessionService } from '../../../services';
import { FormBuilder } from '@angular/forms';
import { Session } from '../../../models';

@Component({
  selector: 'recover-password',
  template,
  outputs: ['go', 'done']
})

export class RecoverPasswordComponent {

  static get parameters(){
    return [OauthSessionService, FormBuilder];
  }

  constructor(OauthSessionService, FormBuilder){
    this.session = OauthSessionService;
    this.go = new EventEmitter();
    this.done = new EventEmitter();
    this.user = new Session( FormBuilder );
  }

  goTo( state ) {
    this.go.emit( state );
  }

  recoverPassword(){
    this.session.recoverPassword( this.user.form.controls.email.value )
      .subscribe( res => {
        this.success = true;
      }, () => {
        this.showError();
      })
  }
  showError(){
    this.type = 'danger';
    this.msg = 'Please try to reset your password again';
  }
  close(){
    this.done.emit();
  }
}
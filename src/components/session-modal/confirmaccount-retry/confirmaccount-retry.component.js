import { Component, EventEmitter } from '@angular/core';
import template from './confirmaccount-retry.template.html';

import { OauthSessionService } from '../../../services';

@Component({
  selector: 'confirm-account-retry',
  template,
  outputs: ['done']
})

export class ConfirmAccountRetryComponent {
  static get parameters(){
    return [OauthSessionService]
  }
  constructor( OauthSessionService ){
    this.session = OauthSessionService;
    this.done = new EventEmitter();
  }

  resendEmail(){
    this.session.resendConfirmEmail()
      .then(res => {
        this.type = 'success';
        this.msg = 'We have resent you a confirmation link, please check your email';
      }, () => {
        this.type = 'danger';
        this.msg = 'We are unable to procees your request at this time';
      })
  }
}
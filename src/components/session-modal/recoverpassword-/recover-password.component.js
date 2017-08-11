import { Component, EventEmitter } from '@angular/core';
import template from './recover-password.template.html';

import { OauthSessionService } from '../../../services';

@Component({
  selector: 'recover-password',
  template,
  outputs: ['go', 'done']
})

export class RecoverPasswordComponent {

  static get parameters(){
    return [OauthSessionService];
  }

  constructor(OauthSessionService){
    this.session = OauthSessionService;
    this.go = new EventEmitter();
    this.done = new EventEmitter();
    this.email = '';
  }

  ngOnInit(){
  }

  goTo( state ) {
    this.go.emit( state );
  }

  recoverPassword(){
    this.session.recoverPassword( this.email )
      .subscribe( res => {
        this.success = true;
      })
  }
  close(){
    this.done.emit();
  }
}


import { Component, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import template from './register.template.html';

import { OauthSessionService } from '../../services';

@Component({
  selector: 'register',
  template,
  outputs: ['go']
})

export class RegisterComponent {

  static get parameters(){
    return [OauthSessionService];
  }

  constructor(OauthSessionService){
    this.session = OauthSessionService;
    this.go = new EventEmitter();
  }

  goTo( state ) {
    this.go.emit( state );
  }

  register(){
    this.session.register({user: {email: 'jesus.rocha@whichdegree.co', password: '12345678'}})
      .subscribe( res => {
        console.log(res);
    })
  }
}


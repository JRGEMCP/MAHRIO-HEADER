import { Validators } from '@angular/forms';

import { validEmail } from '../validators';

export class Session {
  constructor( formBuilder ) {
    this._form = formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        validEmail()
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])]
    });
  }
  get form(){ return this._form; }
  get payload(){
    return {
      email: this._form.controls.email.value,
      password: this._form.controls.password.value
    };
  }
}
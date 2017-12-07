import { EventEmitter, Component } from '@angular/core';
import template from './toast.template.html';

@Component({
  selector: 'toast',
  template,
  inputs: ['alert'],
  outputs: ['reset']
})

export class ToastComponent {
  static get parameters(){
    return [];
  }
  constructor( ){
    this.reset = new EventEmitter();
  }

  ngOnInit(){
    if( this.alert.dismiss ) {
      console.log('I hit it', this.alert.dismiss);
      setTimeout( () => {
        this.reset.emit();
      }, this.alert.dismiss);
    }
  }
}
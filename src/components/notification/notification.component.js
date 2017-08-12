import { Component } from '@angular/core';
import template from './notification.template.html';
import style from './notification.style.scss';

import { NotificationService } from '../../services';

@Component({
  selector: 'notification',
  template,
  styles: [style]
})

export class NotificationComponent {
  static get parameters(){
    return [NotificationService];
  }

  constructor( NotificationService ) {
    this.notice = NotificationService;
    this.notices = this.notice.getAll();
  }


}
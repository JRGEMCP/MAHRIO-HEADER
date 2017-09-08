import { Component, ViewEncapsulation } from '@angular/core';
import template from './notification.template.html';
import style from './notification.style.scss';

import { NotificationService, SocketService } from '../../services';

@Component({
  selector: 'notification',
  template,
  styles: [style],
  encapsulation: ViewEncapsulation.None
})

export class NotificationComponent {
  static get parameters(){
    return [NotificationService, SocketService];
  }

  constructor( NotificationService, SocketService ) {
    this.notice = NotificationService;
    this.sockets = SocketService;
    this.notices = this.notice.getAll();
  }
  ngOnInit(){
    // this.messageConnection = this.sockets.getMessages().subscribe( message => {
    //   console.log( message );
    // });
  }
  ngOnDestroy(){
    if( this.messageConnection ) { this.messageConnection.unsubscribe() }
  }
  timedCollapse(){
    setTimeout( () => {
      this.notifications = false;
    }, 150);
  }


}
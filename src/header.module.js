import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { Components, SessionComponent  } from './components/index';
import { Services } from './services'


@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
  ],
  declarations: [
    HeaderComponent,
    ...Components,
  ],
  providers: [
    Services
  ],
  exports: [
    HeaderComponent,
  ],
  entryComponents: [
    SessionComponent
  ]
})
export class HeaderModule {
  static forRoot(){
    return {
      ngModule: HeaderModule,
      providers: [...Services]
    }
  }
}

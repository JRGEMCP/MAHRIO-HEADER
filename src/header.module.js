import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { Components,
  HeadingComponent,
  MahrioMediaComponent,
  FiltersComponent,
  ActiveFiltersComponent,
  PaginationComponent,
  SessionModalComponent  } from './components/index';
import { Services } from './services';


@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
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
    HeadingComponent,
    FiltersComponent,
    ActiveFiltersComponent,
    PaginationComponent,
    MahrioMediaComponent,

  ],
  entryComponents: [
    SessionModalComponent
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

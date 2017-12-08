import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { Components,
  HeadingComponent,
  MahrioMediaComponent,
  FiltersComponent,
  ActiveFiltersComponent,
  PaginationComponent,
  ToastComponent,
  FormTagsComponent,
  HeadingBarComponent,
  SessionModalComponent  } from './components/index';
import { Services } from './services';


@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
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
    ToastComponent,
    MahrioMediaComponent,
    FormTagsComponent,
    HeadingBarComponent,
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

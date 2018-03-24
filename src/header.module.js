import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap';

import { SessionComponent } from './components/session/session.component';
import { SessionModalComponent } from './components/session-modal/session-modal.component';
import { LoginComponent } from './components/session-modal/login/login.component';
import { RegisterComponent } from './components/session-modal/register/register.component';
import { RecoverPasswordComponent } from './components/session-modal/recoverpassword-/recover-password.component';
import { RecoverPasswordUpdateComponent } from './components/session-modal/recoverpassword-update/recover-password-update.component';
import { ConfirmAccountComponent } from './components/session-modal/confirmaccount/confirmaccount.component';
import { ConfirmAccountRetryComponent } from './components/session-modal/confirmaccount-retry/confirmaccount-retry.component';
import { UpdatePasswordComponent } from './components/session-modal/update-password/update-password.component';
import { HeaderComponent } from './header/header.component';
import { HeadingBarComponent } from './components/heading-bar/heading-bar.component';
import { FormTagsComponent } from './components/tags/tags.component';
import { ToastComponent } from './components/toast/toast.component';
import { PaginationComponent } from './components/pagination/pagination.component';
// import { ActiveFiltersComponent } from './components/filters-active/active-filters.component';
// import { FiltersComponent } from './components/filters/filters.component';
import { MahrioMediaComponent } from './components/media/media.component';
import { HeadingComponent } from './components/heading/heading.component';
import { AlertStatusComponent } from './components/alert-status/alert-status.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';


// import { Components,
//   SubHeaderComponent,
//   AlertStatusComponent,
//   HeadingComponent,
//   MahrioMediaComponent,
//   FiltersComponent,
//   ActiveFiltersComponent,
//   PaginationComponent,
//   ToastComponent,
//   FormTagsComponent,
//   HeadingBarComponent } from './components/index';
import { Services } from './services';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    SessionComponent,
    SessionModalComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    RecoverPasswordUpdateComponent,
    ConfirmAccountComponent,
    ConfirmAccountRetryComponent,
    UpdatePasswordComponent,

    HeadingComponent,
    AlertStatusComponent,
    HeadingComponent,
    // FiltersComponent,
    // ActiveFiltersComponent,
    PaginationComponent,
    ToastComponent,
    MahrioMediaComponent,
    FormTagsComponent,
    HeadingBarComponent,
    SubHeaderComponent,

    // HeaderComponent,
    // ...Components,
  ],
  providers: [
    // Services
  ],
  exports: [
    HeadingComponent,
    AlertStatusComponent,
    HeaderComponent,
    HeadingComponent,
    // FiltersComponent,
    // ActiveFiltersComponent,
    PaginationComponent,
    ToastComponent,
    MahrioMediaComponent,
    FormTagsComponent,
    HeadingBarComponent,
    SubHeaderComponent
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

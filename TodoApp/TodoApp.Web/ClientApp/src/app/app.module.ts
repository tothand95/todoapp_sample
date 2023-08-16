import { APP_ID, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { RegisterComponent } from './components/register/register.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProfileImageDirective } from './directives/profile-image.directive';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    TodoListComponent,
    TodoAddComponent,
    TodoCardComponent,
    UserListComponent,
    AddUserComponent,
    ProfileImageDirective

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgbDatepickerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    })
  ],
  providers: [
    { provide: APP_ID, useValue: 'ng-cli-universal' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

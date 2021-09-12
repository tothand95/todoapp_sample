import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { JwtHelper } from 'angular2-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './components/user-list/user-list.component';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ProfileImageDirective } from './directives/profile-image.directive';
import { AuthGuard } from './guards/auth.guard';
import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
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
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgSelect2Module,
    NgSelectModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
    ])
  ],
  exports: [ProfileImageDirective],
  providers: [JwtHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }

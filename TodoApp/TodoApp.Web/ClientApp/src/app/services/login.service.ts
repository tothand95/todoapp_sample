import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @Output() changeLoginStatus: EventEmitter<boolean> = new EventEmitter();
  @Output() changeUserRole: EventEmitter<string> = new EventEmitter();

  constructor(private jwtHelper: JwtHelper, private http: HttpClient) { }

  public emitLoginStatus() {
    const token = localStorage.getItem('jwt');
    this.changeLoginStatus.emit(token != null && !this.jwtHelper.isTokenExpired(token));
  }

  public emitUserRole() {
    this.changeUserRole.emit(localStorage.getItem('role'));
  }

  public setUserRole() {
    this.http.get('/api/auth/roleforuser', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(response => {
      localStorage.setItem('role', (<any>response).role);
      this.emitUserRole();
    }, err => {
      localStorage.removeItem('role');
    });
  }
}

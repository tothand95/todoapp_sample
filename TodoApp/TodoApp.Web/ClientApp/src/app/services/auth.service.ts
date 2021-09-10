import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse } from 'src/model/login-response';
import { RegisterRequest } from 'src/model/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() changeLoginStatus: EventEmitter<boolean> = new EventEmitter();
  @Output() changeUserRole: EventEmitter<string> = new EventEmitter();

  constructor(private jwtHelper: JwtHelper, private http: HttpClient) { }

  public login(credentialsJson: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/user/login', credentialsJson, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');

    this.emitLoginStatus();
  }

  public register(requestData: RegisterRequest): Observable<void> {
    return this.http.post<void>('/api/user/register', JSON.stringify(requestData), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public emitLoginStatus() {
    const token = localStorage.getItem('jwt');
    this.changeLoginStatus.emit(token != null && !this.jwtHelper.isTokenExpired(token));
  }

  public emitUserRole() {
    this.changeUserRole.emit(localStorage.getItem('role'));
  }

  public setUserRole() {
    this.http.get('/api/user/rolesforuser', {
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

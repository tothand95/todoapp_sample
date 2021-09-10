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
    this.changeLoginStatus.emit(this.isLoggedIn());
  }

  public emitUserRole() {
    this.changeUserRole.emit(localStorage.getItem('role'));
  }

  public setUserRole() {
    const token = localStorage.getItem('jwt');
    if (this.isLoggedIn()) {
      this.http.get('/api/user/rolesforuser', {
        headers: new HttpHeaders({
          'Authorization': token,
          'Content-Type': 'application/json'
        })
      }).subscribe(response => {
        localStorage.setItem('role', (<any>response)[0]);
        this.emitUserRole();
      }, err => {
        localStorage.removeItem('role');
      });
    }
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    return (token !== null && !this.jwtHelper.isTokenExpired(token));
  }
}

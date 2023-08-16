import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse } from 'src/model/login-response';
import { RegisterRequest } from 'src/model/register-request';
import { UserModel } from 'src/model/user-model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() changeLoginStatus: EventEmitter<boolean> = new EventEmitter();
  @Output() changeUserRole: EventEmitter<string> = new EventEmitter();

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) { }

  login(credentialsJson: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', credentialsJson, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getProfilePicture(userid: string): Observable<any> {
    return this.http.get<any>('/api/user/' + userid + '/profilepicture', {
      responseType: 'blob' as 'json'
    });
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');

    this.emitLoginStatus();
  }

  register(requestData: RegisterRequest): Observable<void> {
    return this.http.post<void>('/api/user', JSON.stringify(requestData));
  }

  setUserRole() {
    const token = localStorage.getItem('jwt');
    if (this.isLoggedIn()) {
      this.http.get('/api/user/rolesforuser', {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        })
      }).subscribe(response => {
        localStorage.setItem('role', (<any>response)[0]);
        this.emitUserRole();
      }, _err => {
        localStorage.removeItem('role');
      });
    }
  }

  listUsers(): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get<any>('api/users', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  deleteUser(userid: string): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.delete<any>('/api/user/' + userid, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  editUser(userData: UserModel): Observable<boolean> {
    const token = localStorage.getItem('jwt');
    return this.http.put<boolean>('api/user/' + userData.id, JSON.stringify(userData), {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    return (token !== null && !this.jwtHelper.isTokenExpired(token));
  }

  emitLoginStatus() {
    this.changeLoginStatus.emit(this.isLoggedIn());
  }

  emitUserRole() {
    this.changeUserRole.emit(localStorage.getItem('role'));
  }
}

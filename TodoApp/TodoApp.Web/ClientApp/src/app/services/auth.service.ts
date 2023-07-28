import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output, Directive } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { LoginResponse } from 'src/model/login-response';
import { RegisterRequest } from 'src/model/register-request';
import { UserModel } from 'src/model/user-model';

@Directive()
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() changeLoginStatus: EventEmitter<boolean> = new EventEmitter();
  @Output() changeUserRole: EventEmitter<string> = new EventEmitter();

  constructor(private jwtHelper: JwtHelper, private http: HttpClient) { }

  public login(credentialsJson: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', credentialsJson, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public getProfilePicture(userid: string): Observable<any> {
    return this.http.get<any>('/api/user/' + userid + '/profilepicture', {
      responseType: 'blob' as 'json'
    });
  }

  public logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');

    this.emitLoginStatus();
  }

  public register(requestData: RegisterRequest): Observable<void> {
    const formData = new FormData();
    for (const prop in requestData) {
      if (!requestData.hasOwnProperty(prop)) { continue; }
      formData.append(prop, requestData[prop]);
    }
    return this.http.post<void>('/api/user/register', formData);
  }

  public setUserRole() {
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

  public listUsers(): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get<any>('api/users', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  public deleteUser(userid: string): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.delete<any>('/api/user/' + userid, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  public editUser(userData: UserModel): Observable<boolean> {
    const token = localStorage.getItem('jwt');
    return this.http.put<boolean>('api/user/' + userData.id, JSON.stringify(userData), {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    return (token !== null && !this.jwtHelper.isTokenExpired(token));
  }

  public emitLoginStatus() {
    this.changeLoginStatus.emit(this.isLoggedIn());
  }

  public emitUserRole() {
    this.changeUserRole.emit(localStorage.getItem('role'));
  }
}

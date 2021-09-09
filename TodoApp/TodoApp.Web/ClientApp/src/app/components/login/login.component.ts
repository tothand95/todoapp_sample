import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  username: string;
  password: string;
  errors: any;

  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) {
  }

  ngOnInit() {

  }

  login(form: NgForm) {
    localStorage.removeItem('jwt');
    const credentials = JSON.stringify(form.value);
    this.http.post('/api/auth/login', credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem('jwt', token);

      this.loginService.emitLoginStatus();
      this.loginService.setUserRole();

      this.invalidLogin = false;
      if ((<any>response).needNewPassword === true) {
        this.router.navigate(['/changepassword']);
      } else {
        this.router.navigate(['/']);
      }
    }, err => {
      this.loginService.emitLoginStatus();

      this.invalidLogin = true;
      this.errors = err.error;
    });
  }
}

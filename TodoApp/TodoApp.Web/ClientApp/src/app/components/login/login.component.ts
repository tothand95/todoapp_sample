import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  username: string;
  password: string;
  error: string;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit() {

  }

  login(form: NgForm) {
    localStorage.removeItem('jwt');
    const credentials = JSON.stringify(form.value);
    this.authService.login(credentials)
      .subscribe(response => {
        const token = response.token;
        localStorage.setItem('jwt', token);

        this.authService.emitLoginStatus();

        this.invalidLogin = false;

        if (response.needNewPassword === true) {
          this.router.navigate(['/changepassword']);
        } else {
          this.router.navigate(['/']);
        }
      }, err => {
        this.authService.emitLoginStatus();

        this.invalidLogin = true;
        this.error = err.error;
      });
  }
}

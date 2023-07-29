import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  username: string;
  password: string;
  error: string;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {

  }

  login(form: NgForm) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    const credentials = JSON.stringify(form.value);
    this.authService.login(credentials)
      .subscribe(response => {
        localStorage.setItem('jwt', response.token);
        localStorage.setItem('username', response.username);

        this.invalidLogin = false;

        if (response.needNewPassword === true) {
          this.router.navigate(['/changepassword']);
        } else {
          this.router.navigate(['/todos']);
        }

        this.authService.emitLoginStatus();

      }, err => {
        this.authService.emitLoginStatus();

        this.invalidLogin = true;
        this.error = err.error;
      });
  }
}

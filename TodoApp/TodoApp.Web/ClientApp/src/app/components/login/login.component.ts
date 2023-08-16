import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
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
  error: string;

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl<string>(''),
      password: new FormControl<string>('')
    });
  }

  login() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    const credentials = JSON.stringify(this.loginForm.value);

    console.log('login');
    this.authService.login(credentials)
      .subscribe({
        next: response => {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('username', response.username);

          this.invalidLogin = false;

          if (response.needNewPassword === true) {
            this.router.navigate(['/changepassword']);
          } else {
            this.router.navigate(['/todos']);
          }

          this.authService.emitLoginStatus();

        },
        error: err => {
          this.authService.emitLoginStatus();

          this.invalidLogin = true;
          this.error = err.error;
        }
      });
  }
}

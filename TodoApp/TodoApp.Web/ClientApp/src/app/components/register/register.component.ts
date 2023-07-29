import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterRequest } from 'src/model/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formData: RegisterRequest;
  passwordConfirm: string;
  errors: string[] = [];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.formData = new RegisterRequest();
    this.formData.email = 'asd@asd.hu';
    this.formData.password = 'asdasd';
    this.formData.username = 'hahaasd';
    this.passwordConfirm = 'asdasd';
    this.errors = [];
  }

  register(form: NgForm) {
    this.errors.length = 0;
    if (this.formData.password === this.passwordConfirm) {
      this.authService.register(this.formData)
        .subscribe(response => {
          const credentials = JSON.stringify({ username: this.formData.username, password: this.formData.password });
          this.authService.login(credentials).subscribe(loginResponse => {
            localStorage.setItem('jwt', loginResponse.token);
            localStorage.setItem('username', loginResponse.username);

            this.authService.emitLoginStatus();
            this.router.navigate(['/']);

          }, err => {
            this.authService.emitLoginStatus();
          });
        }, err => {
          this.errors.length = 0;
          if (typeof (err.error) === 'string') {
            this.errors.push(err.error);
          } else {
            this.errors.push(...err.error);
          }
        });
    }
  }

  getFile(event: any) {
    this.formData.picture = (event.target.files as FileList).item(0);
  }
}

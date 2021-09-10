import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterRequest } from 'src/model/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formData: RegisterRequest;
  passwordConfirm: string;
  errors: string[];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.formData = new RegisterRequest();
    this.passwordConfirm = '';
    this.errors = [];
  }

  public register() {
    if (this.formData.password === this.passwordConfirm) {
      this.authService.register(this.formData)
        .subscribe(response => {

        }, err => {
          console.log(err);
          this.errors.length = 0;
          if (typeof (err.error) === 'string') {
            this.errors.push(err.error);
          } else {
            this.errors.push(...err.error);
          }
        });
    }
  }
}

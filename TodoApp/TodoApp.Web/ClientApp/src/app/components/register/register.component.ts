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
  }

  public register() {
    this.authService.register(this.formData)
      .subscribe(response => {

      }, err => {
        this.errors = err.error;
      });
  }
}

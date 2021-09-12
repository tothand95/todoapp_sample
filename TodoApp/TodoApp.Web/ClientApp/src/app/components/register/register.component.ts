import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  errors: string[] = [];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.formData = new RegisterRequest();
    this.formData.email = 'asd@asd.hu';
    this.formData.password = 'asdasd';
    this.formData.username = 'hahaasd';
    this.passwordConfirm = 'asdasd';
    this.errors = [];
  }

  public register(form: NgForm) {
    this.errors.length = 0;
    if (this.formData.password === this.passwordConfirm) {
      this.authService.register(this.formData)
        .subscribe(response => {
          // TODO login and redirect
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

  public getFile(event) {

    this.formData.picture = (event.target.files as FileList).item(0);
    console.log(this.formData.picture);

  }
}

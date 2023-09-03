import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterRequest } from 'src/model/register-request';
import { UserModel } from 'src/model/user-model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Output() userCreatedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() userToEdit: UserModel;

  formData: RegisterRequest = new RegisterRequest();
  errors: string[] = [];

  form: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl<string>(''),
      email: new FormControl<string>('')
    });

    if (this.userToEdit) {
      this.form.patchValue(this.userToEdit);
    }
  }

  addUser() {
    console.log(this.form.value);

    this.errors.length = 0;

    if (this.userToEdit) {
      const userData = new UserModel();
      userData.email = this.formData.email;
      userData.id = this.userToEdit.id;
      this.authService.editUser(userData)
        .subscribe({
          next: _response => {
            this.userCreatedEvent.emit(true);
          },
          error: err => {
            this.errors.length = 0;
            if (typeof (err.error) === 'string') {
              this.errors.push(err.error);
            } else {
              this.errors.push(...err.error);
            }
          }
        });


    } else {
      this.authService.register({
        email: this.form.controls['email'].value,
        username: this.form.controls['username'].value,
        password: null,
        picture: null
      })
        .subscribe({
          next: _response => {
            this.userCreatedEvent.emit(true);
          },
          error: err => {
            this.errors.length = 0;
            if (typeof (err.error) === 'string') {
              this.errors.push(err.error);
            } else {
              this.errors.push(...err.error);
            }
          }
        });
    }
  }

  cancel() {
    this.cancelEvent.emit(true);
  }
}

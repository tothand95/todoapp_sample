import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterRequest } from 'src/model/register-request';
import { UserModel } from 'src/model/user-model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() userCreatedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() userToEdit: UserModel;

  formData: RegisterRequest;
  errors: string[] = [];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.formData = new RegisterRequest();
    this.errors = [];

    if (this.userToEdit) {
      this.formData.email = this.userToEdit.email;
      this.formData.username = this.userToEdit.userName;
    }
  }

  public addUser() {
    this.errors.length = 0;

    if (this.userToEdit) {
      const userData = new UserModel();
      userData.email = this.formData.email;
      userData.id = this.userToEdit.id;
      this.authService.editUser(userData)
        .subscribe(response => {
          this.userCreatedEvent.emit(true);
        }, err => {
          this.errors.length = 0;
          if (typeof (err.error) === 'string') {
            this.errors.push(err.error);
          } else {
            this.errors.push(...err.error);
          }
        });

    } else {
      this.authService.register(this.formData)
        .subscribe(response => {
          this.userCreatedEvent.emit(true);
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

  public cancel() {
    this.cancelEvent.emit(true);
  }
}

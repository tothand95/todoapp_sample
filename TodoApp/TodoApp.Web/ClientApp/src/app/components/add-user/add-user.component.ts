import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterRequest } from 'src/model/register-request';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() userCreatedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();

  formData: RegisterRequest;
  errors: string[] = [];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.formData = new RegisterRequest();
    this.errors = [];
  }

  public addUser() {
    this.errors.length = 0;

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

  public cancel() {
    this.cancelEvent.emit(true);
  }
}

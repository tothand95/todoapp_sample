import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterRequest } from 'src/model/register-request';
import { UserModel } from 'src/model/user-model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserModel[];
  newUser: RegisterRequest;
  selectedUserId: string;
  selectedUserName: string;

  constructor(private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.listUsersApiCall();
  }

  public showTodosForUserModal(modalContent, user: UserModel) {
    this.selectedUserId = user.id;
    this.selectedUserName = user.userName;
    this.openModal(modalContent);
  }

  public showAddUserModal(modalContent) {
    this.openModal(modalContent);
  }

  public userCreated() {
    this.listUsersApiCall();
  }

  private openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
    }, (reason) => {
    });
  }

  private listUsersApiCall() {
    this.users = [];
    this.authService.listUsers()
      .subscribe(response => {
        this.users = response;
      }, err => {
      });
  }
}

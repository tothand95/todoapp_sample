import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'oidc-client';
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
  selectedUser: UserModel;

  constructor(private authService: AuthService, private modalService: NgbModal, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.listUsersApiCall();
  }

  public showTodosForUserModal(modalContent, user: UserModel) {
    this.selectedUser = user;
    this.openModal(modalContent, 'xl');
  }

  public showAddUserModal(modalContent) {
    this.selectedUser = null;
    this.openModal(modalContent, 'md');
  }

  public userCreated() {
    this.listUsersApiCall();
  }

  public deleteUser(user: UserModel) {
    if (confirm('Are you sure to delete ' + user.userName)) {
      this.authService.deleteUser(user.id).subscribe(response => {
        this.listUsersApiCall();
      }, err => {
        alert('Deleting user task failed.');
      });
    }
  }

  public editUser(modalContent, user: UserModel) {
    this.selectedUser = user;
    this.openModal(modalContent, 'md');
  }

  private openModal(content, size: string) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size }).result.then((result) => {
    }, (reason) => {
    });
  }

  private listUsersApiCall() {
    this.spinner.show();
    this.users = [];
    this.authService.listUsers()
      .subscribe(response => {
        this.users = response;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
  }

}

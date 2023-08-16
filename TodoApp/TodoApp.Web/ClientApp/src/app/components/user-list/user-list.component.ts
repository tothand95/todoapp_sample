import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'oidc-client';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterRequest } from 'src/model/register-request';
import { UserModel } from 'src/model/user-model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: UserModel[];
  newUser: RegisterRequest;
  selectedUser: UserModel;

  constructor(private authService: AuthService, private modalService: NgbModal, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.listUsersApiCall();
  }

  showTodosForUserModal(modalContent: TemplateRef<any>, user: UserModel) {
    this.selectedUser = user;
    this.openModal(modalContent, 'xl');
  }

  showAddUserModal(modalContent: TemplateRef<any>) {
    this.selectedUser = null;
    this.openModal(modalContent, 'md');
  }

  userCreated() {
    this.listUsersApiCall();
  }

  deleteUser(user: UserModel) {
    if (confirm('Are you sure to delete ' + user.userName)) {
      this.authService.deleteUser(user.id).subscribe(response => {
        this.listUsersApiCall();
      }, err => {
        alert('Deleting user task failed.');
      });
    }
  }

  editUser(modalContent: TemplateRef<any>, user: UserModel) {
    this.selectedUser = user;
    this.openModal(modalContent, 'md');
  }

  private openModal(content: TemplateRef<any>, size: string) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size }).result.then((result) => {
    }, (reason) => {
    });
  }

  private listUsersApiCall() {
    // this.spinner.show();
    this.users = [];
    this.authService.listUsers()
      .pipe(finalize(() => { this.spinner.hide() }))
      .subscribe({
        next: response => {
          this.users = response;
        }
      });
  }

}

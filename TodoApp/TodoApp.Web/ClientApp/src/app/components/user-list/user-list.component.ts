import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/model/user-model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserModel[];

  constructor(private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.users = [];
    this.authService.listUsers()
      .subscribe(response => {
        this.users = response;
        console.log(this.users);
      }, err => {
      });

  }

  public showTodosForUser(modalContent) {
    this.openModal(modalContent);
  }

  public addUser(modalContent) {
    this.openModal(modalContent);
  }

  private openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }
}

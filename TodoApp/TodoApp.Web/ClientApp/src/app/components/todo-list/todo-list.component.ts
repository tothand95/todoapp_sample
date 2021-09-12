import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/model/todo-model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() userId: string;
  todos: TodoModel[] = [];

  constructor(private todoService: TodoService, private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    if (this.userId) {
      this.todoService.listTodoForUser(this.userId, false)
        .subscribe(response => {
          this.todos = response;
        }, err => {
        });
    } else {
      this.listTodosApiCall();
    }
    this.userId = localStorage.getItem('username');
  }

  public showTodoModal(modalContent, todo: TodoModel) {
    this.openModal(modalContent, 'lg');
  }

  public todoCreated() {
    this.listTodosApiCall();
  }
  private openModal(content, size: string) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size }).result.then((result) => {
    }, (reason) => {
    });
  }

  public listTodosApiCall() {
    this.todoService.listTodoForCurrentUser()
      .subscribe(response => {
        this.todos = response;
      }, err => {
      });
  }

  public deleteTodo(todo: TodoModel) {
    if (confirm('Are you sure to delete ' + todo.id)) {
      this.todoService.deleteTodo(todo.id).subscribe(response => {
        alert('Todo deleted');
        this.listTodosApiCall();
      }, err => {
        alert('Deleting user task failed.');
      });
    }
  }
}

import { Component, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/model/todo-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() userId: string;
  todos: TodoModel[] = [];
  selectedTodo: TodoModel;

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

  showTodoModal(modalContent: TemplateRef<any>, todo: TodoModel) {
    this.selectedTodo = todo;
    this.openModal(modalContent, 'lg');
  }

  todoCreated() {
    this.listTodosApiCall();
  }

  listTodosApiCall() {
    this.todoService.listTodoForCurrentUser()
      .subscribe(response => {
        this.todos = response;
      }, err => {
      });
  }

  deleteTodo(todo: TodoModel) {
    if (confirm('Are you sure to delete ' + todo.id)) {
      this.todoService.deleteTodo(todo.id).subscribe(response => {
        alert('Todo deleted');
        this.listTodosApiCall();
      }, err => {
        alert('Deleting user task failed.');
      });
    }
  }

  private openModal(content: TemplateRef<any>, size: string) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: size }).result
      .then((result) => {
      }, (reason) => {
      });
  }
}

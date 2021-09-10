import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/model/todo-model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: TodoModel[] = [];

  constructor(private todoService: TodoService, private authService: AuthService) { }

  ngOnInit() {
    console.log('oninit');
    this.todoService.listTodoForCurrentUser()
      .subscribe(response => {
        this.todos = response;
      }, err => {
      });
  }

}

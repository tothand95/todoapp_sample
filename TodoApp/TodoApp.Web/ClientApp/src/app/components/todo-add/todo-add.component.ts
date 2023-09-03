import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/model/todo-model';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  @Output() todoCreatedEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() todoData: TodoModel;
  @Input() userId: string;
  errors: string[] = [];
  priorityNames: string[] = [];
  statusNames: string[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.errors = [];
    if (!this.todoData) {
      this.todoData = new TodoModel();
      this.todoData.userId = this.userId;
    } else {
      if (this.todoData.deadline) {
        this.todoData.deadline = new Date(this.todoData.deadline);
      }
    }
  }

  addOrEditTodo() {
    this.errors.length = 0;

    if (this.todoData.id) {
      const jsDate = new Date();
      this.todoData.deadline = jsDate;
      this.todoService.editTodo(this.todoData)
        .subscribe(response => {
          this.todoCreatedEvent.emit(true);
        }, err => {
          this.errors.length = 0;
          if (typeof (err.error) === 'string') {
            this.errors.push(err.error);
          } else {
            this.errors.push(...err.error);
          }
        });


    } else {
      const jsDate = new Date();
      this.todoData.deadline = jsDate;
      this.todoService.createTodo(this.todoData)
        .subscribe(response => {
          this.todoCreatedEvent.emit(true);
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

  cancel() {
    this.cancelEvent.emit(true);
  }
}

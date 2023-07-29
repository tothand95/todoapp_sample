import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/model/todo-model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TodoPriority } from 'src/model/todo-priority';
import { TodoStatus } from 'src/model/todo-status';

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
  ngbDate: NgbDateStruct;
  priorityNames: string[] = [];
  statusNames: string[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.errors = [];
    if (!this.todoData) {
      this.todoData = new TodoModel();
      this.todoData.userId = this.userId;
      this.ngbDate = { year: 2021, month: 2, day: 4 };
    } else {
      if (this.todoData.deadline) {
        this.todoData.deadline = new Date(this.todoData.deadline);
        this.ngbDate = {
          year: this.todoData.deadline.getFullYear(),
          month: this.todoData.deadline.getMonth() + 1,
          day: this.todoData.deadline.getDay()
        };
      }
    }
  }

  addOrEditTodo() {
    this.errors.length = 0;

    if (this.todoData.id) {
      const jsDate = new Date(this.ngbDate.year, this.ngbDate.month - 1, this.ngbDate.day, 12);
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
      const jsDate = new Date(this.ngbDate.year, this.ngbDate.month - 1, this.ngbDate.day, 12);
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

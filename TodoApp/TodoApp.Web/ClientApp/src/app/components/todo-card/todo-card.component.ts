import { Component, Input, OnInit } from '@angular/core';
import { TodoModel } from 'src/model/todo-model';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit {
  @Input() model: TodoModel;

  constructor() { }

  ngOnInit() {
  }

}

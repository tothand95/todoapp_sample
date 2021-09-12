import { TodoPriority } from './todo-priority';
import { TodoStatus } from './todo-status';

export class TodoModel {
  id?: number;
  userId: string;
  title: string;
  description: string;
  deadline: Date;
  priority: TodoPriority;
  status: TodoStatus;
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TodoModel } from 'src/model/todo-model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodo(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get<any>('/api/todo/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  listTodoForUser(userid: string, includeArchieved: boolean): Observable<any> {
    const token = localStorage.getItem('jwt');
    let params = new HttpParams();
    params = params.append('includeArchieved', includeArchieved ? 'true' : 'false');

    return this.http.get<any>('/user/' + userid + '/todos', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }), params: params
    });
  }

  listTodoForCurrentUser(): Observable<any> {
    const token = localStorage.getItem('jwt');
    const userid = localStorage.getItem('userid');
    return this.http.get<any>('/api/user/' + userid + '/todos', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  deleteTodo(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.delete<any>('/api/todo/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  createTodo(dto: TodoModel): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.post<any>('/api/todo', JSON.stringify(dto), {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  editTodo(dto: TodoModel): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.put<any>('/api/todo/' + dto.id, JSON.stringify(dto), {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }
}

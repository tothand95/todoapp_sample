import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TodoModel } from 'src/model/todo-model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  public getTodo(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get<any>('/api/todo/getfromid/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  public listTodoForUser(userid: string): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get<any>('/api/todo/getfromuserid/' + userid, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  public listTodoForCurrentUser(): Observable<any> {
    const token = localStorage.getItem('jwt');
    console.log('token');
    console.log(token);
    return this.http.get<any>('/api/todo/getforcurrentuser', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  public deleteTodo(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.delete<any>('/api/todo/delete/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  public createTodo(dto: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.post<any>('/api/todo/create', JSON.stringify(dto), {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }
}

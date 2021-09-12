import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  public listTodoForUser(userid: string, includeArchieved: boolean): Observable<any> {
    const token = localStorage.getItem('jwt');
    let params = new HttpParams();
    params = params.append('includeArchieved', includeArchieved ? 'true' : 'false');

    return this.http.get<any>('/api/todo/getfromuserid/' + userid, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }), params: params
    });
  }

  public listTodoForCurrentUser(): Observable<any> {
    const token = localStorage.getItem('jwt');
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

  public createTodo(dto: TodoModel): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.post<any>('/api/todo/create', JSON.stringify(dto), {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }

  public editTodo(dto: TodoModel): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.put<any>('/api/todo/edit', JSON.stringify(dto), {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    });
  }
}

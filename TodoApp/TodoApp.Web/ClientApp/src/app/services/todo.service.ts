import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  public getTodo(id: number): Observable<any> {
    return this.http.get<any>('/api/todo/getfromid/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public listTodoForUser(userid: string): Observable<any> {
    return this.http.get<any>('/api/todo/getfromuserid/' + userid, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>('/api/todo/delete/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public createTodo(dto: any): Observable<any> {
    return this.http.post<any>('/api/todo/create', JSON.stringify(dto), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';

@Injectable()
export class TodoService
{
  constructor(private http: Http)
  {
  }

  getTodos()
  {
    return this.http.get(environment.api + '/todo').map(res => res.json());
  }

  createTodo(todo)
  {
    return this.http.post(environment.api + '/todo', todo).map(res => res.json());
  }

  deleteTodo(todo)
  {
    return this.http.delete(environment.api + '/todo/' + todo.id);
  }
}

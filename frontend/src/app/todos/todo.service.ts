import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ITodo } from '../types/todo.type';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly #http = inject(HttpClient);
  $todos = signal<ITodo[]>([]);

  constructor() { }

  getTodos() {
    return this.#http.get<{ success: boolean, data: ITodo[]; }>(environment.BACKEND_SERVER_URL + '/todos/');

  }

  postTodo(newTodo: ITodo) {
    return this.#http.post<{ success: boolean, data: ITodo; }>(environment.BACKEND_SERVER_URL + `/todos/`, newTodo);
  }

  getTodoById(todo_id: string) {
    return this.#http.get<{ success: boolean, data: ITodo; }>(environment.BACKEND_SERVER_URL + `/todos/${todo_id}`);
  }

  updateTodoById(updatedTodo: ITodo) {
    return this.#http.put<{ success: boolean, data: number; }>(environment.BACKEND_SERVER_URL + `/todos/` + updatedTodo._id, updatedTodo);
  }

  deleteTodoById(todo_id: string) {
    return this.#http.delete<{ success: boolean, data: number; }>(environment.BACKEND_SERVER_URL + `/todos/` + todo_id);
  }
}

import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { initial_state } from '../types/state.types';
import { TodoService } from './todo.service';
import { response } from 'express';
import { ITodo } from '../types/todo.type';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [ RouterLink ],
  template: `
   <div>
     
   <button><a [routerLink]="['','dashboard','todos','add']">Add Todo</a></button>  
   

    @for(todo of todosService.$todos(); track todo._id ){
      <div>
        <p>{{todo.title}} </p>
        <button><a [routerLink]="['','dashboard','todos','update', todo._id]" >Update</a></button>
        <button (click)="deleteTodo(todo._id)">Delete</button>

    </div>

    }
   </div>


   
  `,
  styles: ``
})
export class TodosComponent {
  readonly #router = inject(Router);
  readonly authService = inject(AuthService);
  todosService = inject(TodoService);
  toastr = inject(ToastrService);

  constructor() {
    this.todosService.getTodos().subscribe(response => {
      this.todosService.$todos.set(response.data);
    });
  }


  deleteTodo(todoId: string) {
    this.todosService.deleteTodoById(todoId).subscribe(response => {
      if (response.success) {
        this.toastr.success("Todo Successfully deleted");
        this.todosService.$todos.update(todos => todos.filter((todo: ITodo) => todo._id !== todoId));

      }
    });

  }

}

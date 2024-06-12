import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from './todo.service';
import { ITodo } from '../types/todo.type';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todos',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  template: `
    <form [formGroup]="form" (ngSubmit)="addTodo()" >
      <input type="text" formControlName='title' placeholder="Enter title"><br/>
      <textarea formControlName='description'></textarea> <br/>
      <input type="checkbox" formControlName='completed'>completed <br/>
      <button type='submit'[disabled]="form.invalid" >Submit</button>



    </form>
  `,
  styles: ``
})
export class AddTodosComponent {
  todoService = inject(TodoService);
  toastr = inject(ToastrService);
  readonly #router = inject(Router);

  form = inject(FormBuilder).nonNullable.group({
    _id: '',
    user_id: "",
    title: [ '', Validators.required ],
    description: [ '', Validators.required ],
    completed: [ false, Validators.required ]

  });


  addTodo() {
    this.todoService.postTodo(this.form.value as ITodo).subscribe(response => {
      if (response.success) {
        this.toastr.success("Successfully added");
        this.#router.navigate([ '', 'dashboard', 'todos' ]);
      } else {
        this.toastr.error("Unsuccessfull");
      }
    });

  }


}

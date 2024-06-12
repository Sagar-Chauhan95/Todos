import { Component, effect, inject, input, signal } from '@angular/core';
import { ITodo, initital_todo } from '../types/todo.type';
import { TodoService } from './todo.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-todo',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  template: `
    <form [formGroup]="form" (ngSubmit)="submitUpdate()" >
      <input type="text" placeholder="Title" formControlName='title' /> <br/>
      <textarea formControlName='description' ></textarea> <br/>
      <input type="checkbox"  formControlName='completed'> completed <br/>

      <button type="submit">Submit</button>
      
  </form>
  `,
  styles: ``
})
export class UpdateTodoComponent {
  todo_id = input<string>('');
  $todo = signal<ITodo>(initital_todo);
  todoService = inject(TodoService);
  readonly toastr = inject(ToastrService);
  readonly router = inject(Router);

  form = inject(FormBuilder).nonNullable.group({
    _id: '',
    user_id: "",
    title: [ "", Validators.required ],
    description: [ "", Validators.required ],
    completed: [ false, Validators.required ]

  });

  constructor() {
    console.log(this.todo_id());
    effect(() => {
      if (this.todo_id) {
        this.todoService.getTodoById(this.todo_id()).subscribe(response => {
          if (response.success) {
            this.form.patchValue(response.data);
          }
        });
      }

    });


  }

  submitUpdate() {
    this.todoService.updateTodoById(this.form.value as ITodo).subscribe(response => {
      if (response.success) {
        this.toastr.success("Todo Successfully added");
        this.router.navigate([ '', 'dashboard', 'todos' ]);
      } else {
        this.toastr.error("Todo addition Unsuccessfull");
      }

    });


  }
}

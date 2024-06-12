import { Routes } from "@angular/router";

export const todo_routes: Routes = [
    { path: "", loadComponent: () => import('./todos/todos.component').then(c => c.TodosComponent) },
    { path: "add", loadComponent: () => import('./todos/add-todos.component').then(c => c.AddTodosComponent) },
    { path: 'update/:todo_id', loadComponent: () => import('./todos/update-todo.component').then(c => c.UpdateTodoComponent) }
];
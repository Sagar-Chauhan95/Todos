import { Routes } from "@angular/router";

export const dashbardRoutes: Routes = [
    { path: '', loadComponent: () => import('./dashboard.component').then(c => c.DashboardComponent) },
    { path: 'todos', loadChildren: () => import('../todos.routes').then(r => r.todo_routes) },
    { path: 'profile', loadComponent: () => import('../authentication/profile.component').then(c => c.ProfileComponent) }
];
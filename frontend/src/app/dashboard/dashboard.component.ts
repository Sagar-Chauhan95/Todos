import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { initial_state } from '../types/state.types';
import { TodosComponent } from '../todos/todos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ TodosComponent, RouterLink ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  readonly #router = inject(Router);
  readonly authService = inject(AuthService);

  logout() {
    this.authService.$state.set(initial_state);
    this.#router.navigate([ '', 'signin' ]);
  }

}

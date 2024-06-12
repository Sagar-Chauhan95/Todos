import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { SignInComponent } from './authentication/sign-in.component';
import { SignUpComponent } from './authentication/sign-up.component';
import { TodosComponent } from './todos/todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, ],
  template: `

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {

  authService = inject(AuthService);


}

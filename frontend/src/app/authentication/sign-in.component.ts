import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../types/user.types';
import { response } from 'express';
import { jwtDecode } from "jwt-decode";
import { IState } from '../types/state.types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class SignInComponent {
  readonly authService = inject(AuthService);
  readonly #toastrService = inject(ToastrService);
  readonly #router = inject(Router);

  form = inject(FormBuilder).nonNullable.group({
    email: [ '', Validators.required ],
    password: [ '', Validators.required ]
  });

  signIn() {
    this.authService.signIn(this.form.value as IUser).subscribe({
      next: response => {
        if (response.success) {
          console.log(response.data);
          const decoded_token = jwtDecode(response.data) as IState;
          this.authService.$state.set({
            _id: decoded_token._id,
            fullname: decoded_token.fullname,
            email: decoded_token.email,
            jwt: response.data

          });

          this.#router.navigate([ '', 'dashboard' ]);

        }
      },
      error: error => {
        this.#toastrService.error("Invalid Username or Password");
      }
    });




  }


}

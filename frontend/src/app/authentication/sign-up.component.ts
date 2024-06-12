import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { IUser } from '../types/user.types';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './signup.html'
  ,
  styleUrl: './signup.css'
})
export class SignUpComponent {
  readonly authService = inject(AuthService);
  #router = inject(Router);
  readonly #toastrService = inject(ToastrService);

  form = inject(FormBuilder).nonNullable.group({
    fullname: [ '', Validators.required ],
    email: [ '', Validators.required ],
    password: [ '', Validators.required ]


  });

  signUp() {
    this.authService.signUp(this.form.value as IUser).subscribe(response => {
      if (response.success) {
        this.#toastrService.success("SignUp Successfull");
        this.#router.navigate([ 'signin' ]);

      }


    });


  }

}

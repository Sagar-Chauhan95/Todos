import { Injectable, computed, effect, inject, signal } from '@angular/core';

import { Router } from '@angular/router';
import { IState, initial_state } from './types/state.types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IUser } from './types/user.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $state = signal<IState>(initial_state);
  readonly #http = inject(HttpClient);

  constructor() {
    effect(() => {
      localStorage.setItem("record", JSON.stringify(this.$state()));
    });
  }

  signIn(credential: { email: string, fullname: string; }) {
    return this.#http.post<{ success: boolean, data: string; }>(environment.BACKEND_SERVER_URL + '/auth/signin', credential);
  }

  signUp(credential: IUser) {
    return this.#http.post<{ success: boolean, data: IUser; }>(environment.BACKEND_SERVER_URL + "/auth/signup", credential);
  }

  is_logged_in() {
    return this.$state()._id ? true : false;
  }
}

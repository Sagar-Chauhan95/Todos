import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  readonly #http = inject(HttpClient);
  authService = inject(AuthService);

  constructor() { }

  getProfilePictures() {
    return this.#http.get<{ success: boolean, data: { _id: string, url: string; }[]; }>(environment.BACKEND_SERVER_URL + `/users/` + this.authService.$state()._id + '/pictures');
  }

  getProfilePictureById(picture_id: string) {
    return this.#http.get<{ success: boolean, data: string; }>(environment.BACKEND_SERVER_URL + `/users/` + this.authService.$state()._id + '/pictures/' + picture_id);

  }

  postProfilePicture(formData: FormData) {
    return this.#http.post<{ success: boolean, data: boolean; }>(environment.BACKEND_SERVER_URL + `/users/` + this.authService.$state()._id + '/pictures', formData);

  }

  deleteProfilePictureById(picture_id: string) {
    return this.#http.delete<{ success: boolean, data: boolean; }>(environment.BACKEND_SERVER_URL + `/users/` + this.authService.$state()._id + '/pictures/' + picture_id);

  }
}

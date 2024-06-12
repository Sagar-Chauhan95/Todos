import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from './profile.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { response } from 'express';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  template: `
   <form [formGroup]="form" (ngSubmit)="uploadPicture()" >
    <input type="file" formControlName='picture' (change)="setFile($event)" /> <br/>
    <button type="submit">submit</button>
   </form>

   @for(picture of $pictures(); track picture._id){

   <img style="width: 80px; height:80px" src="http://localhost:3000/users/{{authService.$state()._id}}/pictures/{{picture._id}}" alt="">
   <button (click)="deletePicture(picture._id)">Delete Picture</button>

   }
  `,
  styles: ``
})
export class ProfileComponent {
  file!: File;
  $pictures = signal<{ _id: string, url: string; }[]>([]);
  readonly #profileService = inject(ProfileService);
  readonly #toastr = inject(ToastrService);
  readonly authService = inject(AuthService);

  form = inject(FormBuilder).nonNullable.group({
    picture: ""
  });

  constructor() {
    this.#profileService.getProfilePictures().subscribe(response => {
      this.$pictures.set(response.data);
    });
  }


  setFile(event: Event) {
    // console.log(event);
    this.file = (event.target as HTMLInputElement).files![ 0 ];

  }

  uploadPicture() {
    const formData = new FormData;
    formData.append('picture', this.file);
    this.#profileService.postProfilePicture(formData).subscribe(response => {
      if (response.success) {
        this.#toastr.success("Picture uploaded successfully");
        this.#profileService.getProfilePictures().subscribe(response => {
          this.$pictures.set(response.data);
        });
        this.form.reset();
      } else {
        this.#toastr.error("Upload unsuccessfull");
      }
    });

  }

  deletePicture(pictureId: string) {
    this.#profileService.deleteProfilePictureById(pictureId).subscribe(response => {
      if (response.success) {
        this.$pictures.update(pictures => pictures.filter(picture => picture._id !== pictureId));
        this.#toastr.success("Picture successfully deleted");
      } else {
        this.#toastr.error("Picture deletion unsuccessfull");
      }
    }
    );
  }

}

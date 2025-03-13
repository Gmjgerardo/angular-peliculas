import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { GenreFormComponent } from "../genre-form/genre-form.component";
import { GenreCreationDTO } from '../genres';

@Component({
  selector: 'app-create-genre',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, GenreFormComponent],
  templateUrl: './create-genre.component.html',
  styleUrl: './create-genre.component.css'
})
export class CreateGenreComponent {
  private router: Router = inject(Router);

  saveChanges(genre: GenreCreationDTO): void {
    // this.router.navigate(['/generos']);
    console.log(genre);
  }
}

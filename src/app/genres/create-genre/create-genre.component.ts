import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { GenreFormComponent } from "../genre-form/genre-form.component";
import { GenreCreationDTO } from '../genres';
import { GenresService } from '../genres.service';
import { HttpErrorResponse } from '@angular/common/http';
import { extractErrors } from '../../shared/functions/index';
import { ErrorListComponent } from "../../shared/components/error-list/error-list.component";

@Component({
  selector: 'app-create-genre',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, GenreFormComponent, ErrorListComponent],
  templateUrl: './create-genre.component.html',
  styleUrl: './create-genre.component.css'
})
export class CreateGenreComponent {
  private router: Router = inject(Router);
  private genreService: GenresService = inject(GenresService);

  errors: string[] = [];

  saveChanges(genre: GenreCreationDTO): void {
    this.genreService.create(genre).subscribe({
      next: () => this.router.navigate(['/generos']),
      error: (err: HttpErrorResponse) => {
        this.errors = extractErrors(err);
      }
    });
  }
}

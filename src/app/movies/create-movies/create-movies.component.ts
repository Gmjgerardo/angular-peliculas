import { Component, inject } from '@angular/core';
import { MovieFormComponent } from "../movie-form/movie-form.component";
import { MovieCreateDTO } from '../movies';
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorModel';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { extractErrors } from '../../shared/functions';
import { ErrorListComponent } from "../../shared/components/error-list/error-list.component";
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-create-movies',
  standalone: true,
  imports: [MovieFormComponent, ErrorListComponent, LoadingComponent, ErrorListComponent],
  templateUrl: './create-movies.component.html',
  styleUrl: './create-movies.component.css',
})
export class CreateMoviesComponent {
  private moviesService: MoviesService = inject(MoviesService);
  private router: Router = inject(Router);

  selectedGenres: MultipleSelectorDTO[] = [];
  notSelectedGenres: MultipleSelectorDTO[] = [];
  selectedCinemas: MultipleSelectorDTO[] = [];
  notSelectedCinemas: MultipleSelectorDTO[] = [];
  selectedActors: MultipleSelectorDTO[] = [];
  errors: string[] = [];

  constructor() {
    this.moviesService.createGet().subscribe(model => {
      // Adding genres to selector
      this.notSelectedGenres = model.genres.map(genre => {
        return <MultipleSelectorDTO>{ key: genre.id, value: genre.name };
      });

      // Adding cinemas to selector
      this.notSelectedCinemas = model.cinemas.map(cinema => {
        return <MultipleSelectorDTO>{ key: cinema.id, value: cinema.name };
      });
    });
  }

  saveChanges(movie: MovieCreateDTO): void {
    this.moviesService.create(movie).subscribe({
      next: movie => {
        console.log(movie);
        this.router.navigate(['/']);
      },
      error: err => this.errors = extractErrors(err),
    });
  }
}

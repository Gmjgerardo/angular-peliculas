import { Component, inject } from '@angular/core';
import { MovieListComponent } from '../movies/movie-list/movie-list.component';
import { MoviesService } from '../movies/movies.service';
import { MovieDTO } from '../movies/movies';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  private moviesService: MoviesService = inject(MoviesService);

  moviesOnCinema!: MovieDTO[];
  moviesUpcoming!: MovieDTO[];

  constructor() {
    this.loadMovies();
  }

  loadMovies(): void {
    this.moviesService.getLandingPageData().subscribe({
      next: ({onCinemas, upcoming}) => {
        this.moviesOnCinema = onCinemas;
        this.moviesUpcoming = upcoming;
      },
      error: err => console.error("Error on loading landing page movies", err),
    });
  }
}

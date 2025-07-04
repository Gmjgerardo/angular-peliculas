import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MovieFormComponent } from "../movie-form/movie-form.component";
import { MovieCreateDTO, MovieDTO, MoviePutGetDTO } from '../movies';
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorModel';
import { ActorAutocompleteDTO } from '../../actors/actors';
import { MoviesService } from '../movies.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { ErrorListComponent } from "../../shared/components/error-list/error-list.component";
import { extractErrors } from '../../shared/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [MovieFormComponent, LoadingComponent, ErrorListComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css'
})
export class EditMovieComponent implements OnInit {
  private movieService: MoviesService = inject(MoviesService);
  private router: Router = inject(Router);

  @Input({ transform: numberAttribute })
  id!: number;

  movie!: MovieDTO;
  selectedGenres!: MultipleSelectorDTO[];
  notSelectedGenres!: MultipleSelectorDTO[];
  selectedCinemas!: MultipleSelectorDTO[];
  notSelectedCinemas!: MultipleSelectorDTO[];
  selectedActors!: ActorAutocompleteDTO[];
  errors: string[] = [];

  ngOnInit(): void {
    this.movieService.updateGet(this.id).subscribe({
      next: (movieDTO: MoviePutGetDTO) => {
        this.movie = movieDTO.movie;
        this.selectedGenres = movieDTO.selectedGenres.map(genre => <MultipleSelectorDTO>{key: genre.id, value: genre.name});
        this.notSelectedGenres = movieDTO.notSelectedGenres.map(genre => <MultipleSelectorDTO>{key: genre.id, value: genre.name});
        this.selectedCinemas = movieDTO.selectedCinemas.map(cinema => <MultipleSelectorDTO>{key: cinema.id, value: cinema.name});
        this.notSelectedCinemas = movieDTO.notSelectedCinemas.map(cinema => <MultipleSelectorDTO>{key: cinema.id, value: cinema.name});
        this.selectedActors = movieDTO.actors;
      },
      error: (err) => console.error('An Error occurred when retrieve movie information process', err),
    });
  }

  saveChanges(movie: MovieCreateDTO): void {
    this.movieService.update(this.id, movie).subscribe({
      next: () => this.router.navigate(["/"]),
      error: (err) => this.errors = extractErrors(err),
    });
  }
}

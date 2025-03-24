import { Component } from '@angular/core';
import { MovieFormComponent } from "../movie-form/movie-form.component";
import { MovieCreateDTO } from '../movies';
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorModel';

@Component({
  selector: 'app-create-movies',
  standalone: true,
  imports: [MovieFormComponent],
  templateUrl: './create-movies.component.html',
  styleUrl: './create-movies.component.css',
})
export class CreateMoviesComponent {
  notSelectedGenres: MultipleSelectorDTO[] = [
    { key: 1, value: 'Drama' },
    { key: 2, value: 'Acción' },
    { key: 3, value: 'Comedia' },
  ];

  notSelectedCinemas: MultipleSelectorDTO[] = [
    { key: 1, value: 'Cinepolis: FORUM Tlaquepaque' },
    { key: 2, value: 'Cinepolis: La Perla' },
    { key: 3, value: 'Cinemex: Tonalá' },
  ];

  saveChanges(movie: MovieCreateDTO): void {
    console.log('Creando:', movie);
  }
}

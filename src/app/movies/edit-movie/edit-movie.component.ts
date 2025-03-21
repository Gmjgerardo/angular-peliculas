import { Component, Input, numberAttribute } from '@angular/core';
import { MovieFormComponent } from "../movie-form/movie-form.component";
import { MovieCreateDTO, MovieDTO } from '../movies';
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorModel';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [MovieFormComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css'
})
export class EditMovieComponent {
  @Input({ transform: numberAttribute })
  id!: number;

  selectedGenres: MultipleSelectorDTO[] = [
      { key: 1, value: 'Drama' },
      { key: 2, value: 'Acción' },
      { key: 3, value: 'Comedia' },
    ];

  notSelectedGenres: MultipleSelectorDTO[] = [
      { key: 1, value: 'Drama' },
      { key: 2, value: 'Acción' },
      { key: 3, value: 'Comedia' },
    ];

  // Static value for testing
  movie: MovieDTO = { id: 1, title: 'Star Wars: Episode III, Revenge Of The Sith', releaseDate: new Date('2005-05-15'), image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg?20171214071623', trailer: 'ABC' };

  saveChanges(movie: MovieCreateDTO): void {
    console.log('Editando:', movie);
  }
}

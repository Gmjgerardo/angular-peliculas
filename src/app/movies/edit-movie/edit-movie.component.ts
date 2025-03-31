import { Component, Input, numberAttribute } from '@angular/core';
import { MovieFormComponent } from "../movie-form/movie-form.component";
import { MovieCreateDTO, MovieDTO } from '../movies';
import { MultipleSelectorDTO } from '../../shared/components/multiple-selector/MultipleSelectorModel';
import { ActorAutocompleteDTO } from '../../actors/actors';

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

  // Static value for testing
  selectedGenres: MultipleSelectorDTO[] = [
      { key: 2, value: 'Acción' },
      { key: 3, value: 'Comedia' },
    ];

  notSelectedGenres: MultipleSelectorDTO[] = [
      { key: 1, value: 'Drama' },
    ];

  selectedCinemas: MultipleSelectorDTO[] = [
      { key: 1, value: 'Cinepolis: FORUM Tlaquepaque' },
      { key: 2, value: 'Cinepolis: La Perla' },
    ];

  notSelectedCinemas: MultipleSelectorDTO[] = [
      { key: 3, value: 'Cinemex: Tonalá' },
    ];

  selectedActors: ActorAutocompleteDTO[] = [
    {id: 1, name: 'Natalie Portman', character: 'Padme Amidala', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Natalie_Portman_2023.jpg/220px-Natalie_Portman_2023.jpg'},
    {id: 2, name: 'Hayden Christensen', character: 'Anakin Skywalker / Darth Vader', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Hayden-cfda2010-0004%281%29_%28cropped%29.jpg/220px-Hayden-cfda2010-0004%281%29_%28cropped%29.jpg'},
    {id: 3, name: 'Ewan McGregor', character: 'Obi-Wan Kenobi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/EwanMcGregor2023.jpg/220px-EwanMcGregor2023.jpg'},
  ];

  movie: MovieDTO = { id: 1, title: 'Star Wars: Episode III, Revenge Of The Sith', releaseDate: new Date('2005-05-15'), image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg?20171214071623', trailer: 'ABC' };

  saveChanges(movie: MovieCreateDTO): void {
    console.log('Editando:', movie);
  }
}

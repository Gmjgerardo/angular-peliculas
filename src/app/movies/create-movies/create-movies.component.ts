import { Component } from '@angular/core';
import { MovieFormComponent } from "../movie-form/movie-form.component";
import { MovieCreateDTO } from '../movies';

@Component({
  selector: 'app-create-movies',
  standalone: true,
  imports: [MovieFormComponent],
  templateUrl: './create-movies.component.html',
  styleUrl: './create-movies.component.css'
})
export class CreateMoviesComponent {
  saveChanges(movie: MovieCreateDTO): void {
    console.log('Creando:', movie);
  }
}

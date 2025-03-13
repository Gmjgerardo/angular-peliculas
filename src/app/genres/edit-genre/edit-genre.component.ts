import { Component, Input, numberAttribute } from '@angular/core';
import { GenreFormComponent } from "../genre-form/genre-form.component";
import { GenreCreationDTO, GenreDTO } from '../genres';

@Component({
  selector: 'app-edit-genre',
  standalone: true,
  imports: [GenreFormComponent],
  templateUrl: './edit-genre.component.html',
  styleUrl: './edit-genre.component.css'
})
export class EditGenreComponent {
  @Input({ transform: numberAttribute })
  id!: number;

  // Static value for testing
  genre: GenreDTO = {id: 1, name: 'Fantasía'};

  saveChanges(genre: GenreCreationDTO): void {
    console.log('Editando el género', genre);
  }
}

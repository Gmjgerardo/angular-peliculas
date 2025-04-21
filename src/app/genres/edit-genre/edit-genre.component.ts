import { Component, Input, numberAttribute } from '@angular/core';
import { GenreFormComponent } from "../genre-form/genre-form.component";
import { GenresService } from '../genres.service';
import { EntityEditComponent } from "../../shared/components/entity-edit/entity-edit.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';

@Component({
  selector: 'app-edit-genre',
  standalone: true,
  imports: [EntityEditComponent],
  templateUrl: './edit-genre.component.html',
  styleUrl: './edit-genre.component.css',
  providers: [{ provide: CRUD_SERVICE_TOKEN, useClass: GenresService }]
})
export class EditGenreComponent {
  @Input({ transform: numberAttribute }) id!: number;
  formComponent: typeof GenreFormComponent  = GenreFormComponent;
}

import { Component } from '@angular/core';
import { GenreFormComponent } from "../genre-form/genre-form.component";
import { GenresService } from '../genres.service';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { EntityCreateComponent } from "../../shared/components/entity-create/entity-create.component";

@Component({
  selector: 'app-create-genre',
  standalone: true,
  imports: [EntityCreateComponent],
  templateUrl: './create-genre.component.html',
  styleUrl: './create-genre.component.css',
  providers: [{ provide: CRUD_SERVICE_TOKEN, useClass: GenresService }],
})
export class CreateGenreComponent {
  genresForm: typeof GenreFormComponent = GenreFormComponent;
}

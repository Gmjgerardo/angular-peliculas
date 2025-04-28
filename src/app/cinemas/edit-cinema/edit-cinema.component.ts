import { Component, Input, numberAttribute } from '@angular/core';
import { CinemaFormComponent } from "../cinema-form/cinema-form.component";
import { EntityEditComponent } from "../../shared/components/entity-edit/entity-edit.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { CinemasService } from '../cinemas.service';

@Component({
  selector: 'app-edit-cinema',
  standalone: true,
  imports: [EntityEditComponent],
  templateUrl: './edit-cinema.component.html',
  styleUrl: './edit-cinema.component.css',
  providers: [{ provide: CRUD_SERVICE_TOKEN, useClass: CinemasService }],
})
export class EditCinemaComponent {
  @Input({ transform: numberAttribute })
  id!: number;

  cinemaForm: typeof CinemaFormComponent = CinemaFormComponent;
}

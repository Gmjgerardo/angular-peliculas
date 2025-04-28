import { Component } from '@angular/core';
import { CinemaFormComponent } from "../cinema-form/cinema-form.component";
import { EntityCreateComponent } from "../../shared/components/entity-create/entity-create.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { CinemasService } from '../cinemas.service';

@Component({
  selector: 'app-create-cinema',
  standalone: true,
  imports: [EntityCreateComponent],
  templateUrl: './create-cinema.component.html',
  styleUrl: './create-cinema.component.css',
  providers: [{ provide: CRUD_SERVICE_TOKEN, useClass: CinemasService }],
})
export class CreateCinemaComponent {
  cinemaForm: typeof CinemaFormComponent = CinemaFormComponent;
}

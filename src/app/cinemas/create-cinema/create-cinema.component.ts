import { Component } from '@angular/core';
import { CinemaFormComponent } from "../cinema-form/cinema-form.component";
import { CinemaCreateDTO } from '../cinemas';

@Component({
  selector: 'app-create-cinema',
  standalone: true,
  imports: [CinemaFormComponent],
  templateUrl: './create-cinema.component.html',
  styleUrl: './create-cinema.component.css'
})
export class CreateCinemaComponent {
  saveChanges(cinema: CinemaCreateDTO): void {
    console.log('Creando:', cinema);
  }
}

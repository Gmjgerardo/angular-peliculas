import { Component, Input, numberAttribute } from '@angular/core';
import { CinemaFormComponent } from "../cinema-form/cinema-form.component";
import { CinemaCreateDTO, CinemaDTO } from '../cinemas';

@Component({
  selector: 'app-edit-cinema',
  standalone: true,
  imports: [CinemaFormComponent],
  templateUrl: './edit-cinema.component.html',
  styleUrl: './edit-cinema.component.css'
})
export class EditCinemaComponent {
  @Input({ transform: numberAttribute })
  id!: number;

  // Static value for testing
  cinema: CinemaDTO = { id: 23, name: 'FORUM Tlaquepaque' }

  saveChanges(cinema: CinemaCreateDTO): void {
    console.log('Editando:', cinema);
    
  }
}

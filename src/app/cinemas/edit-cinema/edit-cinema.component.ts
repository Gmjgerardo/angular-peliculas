import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-edit-cinema',
  standalone: true,
  imports: [],
  templateUrl: './edit-cinema.component.html',
  styleUrl: './edit-cinema.component.css'
})
export class EditCinemaComponent {
  @Input({ transform: numberAttribute })
  id!: number;
}

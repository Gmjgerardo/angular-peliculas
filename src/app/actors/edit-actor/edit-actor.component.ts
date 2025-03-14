import { Component, Input, numberAttribute } from '@angular/core';
import { ActorFormComponent } from "../actor-form/actor-form.component";
import { ActorCreateDTO, ActorDTO } from '../actors';

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [ActorFormComponent],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css'
})
export class EditActorComponent {
  @Input({ transform: numberAttribute })
  id!: number;

  // Static value for testing
  actor: ActorDTO = {id: 1, name: 'Natalie Portman', birthDate: new Date('1981-06-09')};

  saveChanges(actor: ActorCreateDTO): void {
      console.log('Editando al actor', actor);
    }
}

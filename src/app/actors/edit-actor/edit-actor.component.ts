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
  actor: ActorDTO = {id: 1, name: 'Natalie Portman', birthDate: new Date('1981-06-09'), profileImage: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Natalie_Portman_Cannes_2015_3_%28cropped%29.jpg'};

  saveChanges(actor: ActorCreateDTO): void {
      console.log('Editando al actor', actor);
    }
}

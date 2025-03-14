import { Component } from '@angular/core';
import { ActorFormComponent } from "../actor-form/actor-form.component";
import { ActorCreateDTO } from '../actors';

@Component({
  selector: 'app-create-actors',
  standalone: true,
  imports: [ActorFormComponent],
  templateUrl: './create-actors.component.html',
  styleUrl: './create-actors.component.css'
})
export class CreateActorsComponent {
  saveChanges(actor: ActorCreateDTO): void {
    console.log(actor);
  }
}

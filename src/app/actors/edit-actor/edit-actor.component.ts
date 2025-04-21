import { Component, Input, numberAttribute } from '@angular/core';
import { ActorFormComponent } from "../actor-form/actor-form.component";
import { ActorsService } from '../actors.service';
import { EntityEditComponent } from "../../shared/components/entity-edit/entity-edit.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [EntityEditComponent],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css',
  providers: [{ provide: CRUD_SERVICE_TOKEN, useClass: ActorsService }]
})
export class EditActorComponent {
  @Input({ transform: numberAttribute }) id!: number;
  actorFormComponent: typeof ActorFormComponent = ActorFormComponent;
}

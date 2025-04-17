import { Component } from '@angular/core';
import { ActorsService } from '../actors.service';
import { EntityCreateComponent } from "../../shared/components/entity-create/entity-create.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { ActorFormComponent } from '../actor-form/actor-form.component';

@Component({
  selector: 'app-create-actors',
  standalone: true,
  imports: [EntityCreateComponent],
  templateUrl: './create-actors.component.html',
  styleUrl: './create-actors.component.css',
  providers: [{ provide: CRUD_SERVICE_TOKEN, useClass: ActorsService }],
})
export class CreateActorsComponent {
  actorForm: typeof ActorFormComponent = ActorFormComponent;
}

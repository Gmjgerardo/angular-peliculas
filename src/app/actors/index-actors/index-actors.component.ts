import { Component } from '@angular/core';
import { ActorsService } from '../actors.service';
import { EntityIndexComponent } from "../../shared/components/entity-index/entity-index.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';

@Component({
  selector: 'app-index-actors',
  standalone: true,
  imports: [EntityIndexComponent],
  templateUrl: './index-actors.component.html',
  styleUrl: './index-actors.component.css',
  providers: [{ provide: CRUD_SERVICE_TOKEN, useClass: ActorsService }],
})
export class IndexActorsComponent {

}

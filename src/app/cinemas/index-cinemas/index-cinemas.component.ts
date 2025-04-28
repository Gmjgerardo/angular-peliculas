import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';
import { CinemasService } from '../cinemas.service';
import { EntityIndexComponent } from "../../shared/components/entity-index/entity-index.component";

@Component({
  selector: 'app-index-cinemas',
  standalone: true,
  imports: [MatButtonModule, EntityIndexComponent],
  templateUrl: './index-cinemas.component.html',
  styleUrl: './index-cinemas.component.css',
  providers: [{ provide: CRUD_SERVICE_TOKEN, useClass: CinemasService }],
})
export class IndexCinemasComponent {

}

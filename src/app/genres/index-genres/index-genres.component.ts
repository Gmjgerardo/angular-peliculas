import { Component } from '@angular/core';
import { GenresService } from '../genres.service';
import { EntityIndexComponent } from "../../shared/components/entity-index/entity-index.component";
import { CRUD_SERVICE_TOKEN } from '../../shared/providers/providers';

@Component({
  selector: 'app-index-genres',
  standalone: true,
  imports: [EntityIndexComponent],
  templateUrl: './index-genres.component.html',
  styleUrl: './index-genres.component.css',
  providers: [{ provide: CRUD_SERVICE_TOKEN, useClass: GenresService }],
})
export class IndexGenresComponent {

}

import { Component, inject } from '@angular/core';
import { ActorFormComponent } from "../actor-form/actor-form.component";
import { ActorCreateDTO } from '../actors';
import { ActorsService } from '../actors.service';
import { Router } from '@angular/router';
import { ErrorListComponent } from "../../shared/components/error-list/error-list.component";
import { extractErrors } from '../../shared/functions';

@Component({
  selector: 'app-create-actors',
  standalone: true,
  imports: [ActorFormComponent, ErrorListComponent],
  templateUrl: './create-actors.component.html',
  styleUrl: './create-actors.component.css'
})
export class CreateActorsComponent {
  private actorService: ActorsService = inject(ActorsService);
  private router: Router = inject(Router);

  errors: string[] = [];

  saveChanges(actor: ActorCreateDTO): void {
    this.actorService.create(actor).subscribe({
      next: () => this.router.navigate(["/actores"]),
      error: (err) => this.errors = extractErrors(err),
    });
  }
}

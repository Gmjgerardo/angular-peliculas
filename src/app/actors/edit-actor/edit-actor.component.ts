import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { ActorFormComponent } from "../actor-form/actor-form.component";
import { ActorCreateDTO, ActorDTO } from '../actors';
import { ActorsService } from '../actors.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { Router } from "@angular/router";
import { ErrorListComponent } from "../../shared/components/error-list/error-list.component";
import { extractErrors } from '../../shared/functions';

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [ActorFormComponent, LoadingComponent, ErrorListComponent],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css'
})
export class EditActorComponent implements OnInit {
  private actorsServices: ActorsService = inject(ActorsService);
  private router: Router = inject(Router);

  @Input({ transform: numberAttribute }) id!: number;

  actor!: ActorDTO;
  errors: string[] = [];

  ngOnInit(): void {
    this.actorsServices.obtainById(this.id).subscribe({
      next: (actor) => this.actor = {...actor, birthDate: new Date(actor.birthDate)},
      error: (err) => { 
        // ToDo: Show NotFound error
        console.log(err);
        setTimeout(() => this.router.navigate(['/actores']), 2500);
      }
    });
  }

  saveChanges(actor: ActorCreateDTO): void {
      this.actorsServices.update(this.id, actor).subscribe({
        next: () => this.router.navigate(["/actores"]),
        error: (err) => this.errors = extractErrors(err),
      });
    }
}

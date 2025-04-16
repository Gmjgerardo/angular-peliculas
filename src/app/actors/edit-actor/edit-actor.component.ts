import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { ActorFormComponent } from "../actor-form/actor-form.component";
import { ActorCreateDTO, ActorDTO } from '../actors';
import { ActorsService } from '../actors.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [ActorFormComponent, LoadingComponent],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css'
})
export class EditActorComponent implements OnInit {
  @Input({ transform: numberAttribute })
  id!: number;

  actorsServices: ActorsService = inject(ActorsService);
  router: Router = inject(Router);
  actor!: ActorDTO;

  ngOnInit(): void {
    this.actorsServices.obtainById(this.id).subscribe({
      next: (actor) => this.actor = actor,
      error: (err) => { 
        // ToDo: Show NotFound error
        console.log(err);
        setTimeout(() => this.router.navigate(['/actores']), 2500);
      }
    });
  }

  saveChanges(actor: ActorCreateDTO): void {
      console.log('Editando al actor', actor);
    }
}

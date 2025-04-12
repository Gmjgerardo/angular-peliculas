import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ActorsService } from '../actors.service';
import { ActorDTO } from '../actors';
import { HttpResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { GenericListComponent } from "../../shared/components/generic-list/generic-list.component";

@Component({
  selector: 'app-index-actors',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, MatButtonModule, GenericListComponent],
  templateUrl: './index-actors.component.html',
  styleUrl: './index-actors.component.css'
})
export class IndexActorsComponent implements OnInit {
  private actorsService: ActorsService = inject(ActorsService);

  actors: ActorDTO[] = [];
  columnsToDisplay: string[] = ['id', 'name', 'actions'];

  ngOnInit(): void {
    this.actorsService.obtainAll().subscribe((response: HttpResponse<ActorDTO[]>) => {
      const { headers, body } = response;
      this.actors = body as ActorDTO[];
    });
  }
}

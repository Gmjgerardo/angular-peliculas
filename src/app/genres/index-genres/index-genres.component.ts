import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenresService } from '../genres.service';
import { GenreDTO } from '../genres';
import { GenericListComponent } from "../../shared/components/generic-list/generic-list.component";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-index-genres',
  standalone: true,
  imports: [MatButtonModule, RouterLink, GenericListComponent, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './index-genres.component.html',
  styleUrl: './index-genres.component.css'
})
export class IndexGenresComponent {
  genresService: GenresService = inject(GenresService);
  genres!: GenreDTO[];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor() {
    this.genresService.obtainAll().subscribe(genres => {
      this.genres = genres;
    });
  }
}

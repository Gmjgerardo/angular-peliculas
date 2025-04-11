import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { GenreFormComponent } from "../genre-form/genre-form.component";
import { GenreCreationDTO, GenreDTO } from '../genres';
import { GenresService } from '../genres.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { ErrorListComponent } from "../../shared/components/error-list/error-list.component";
import { Router } from '@angular/router';
import { extractErrors } from '../../shared/functions';

@Component({
  selector: 'app-edit-genre',
  standalone: true,
  imports: [GenreFormComponent, LoadingComponent, ErrorListComponent],
  templateUrl: './edit-genre.component.html',
  styleUrl: './edit-genre.component.css'
})
export class EditGenreComponent implements OnInit {
  // Injects
  private genreServie: GenresService = inject(GenresService);
  private router: Router = inject(Router);

  @Input({ transform: numberAttribute })
  id!: number;
  genre?: GenreDTO;
  errors: string[] = [];

  ngOnInit(): void {
    this.genreServie.obtainById(this.id).subscribe((genre) => this.genre = genre);
  }

  saveChanges(genre: GenreCreationDTO): void {
    this.genreServie.update(this.id, genre).subscribe({
      next: () => this.router.navigate(['/generos']),
      error: (err) => this.errors = extractErrors(err),
    });
  }
}

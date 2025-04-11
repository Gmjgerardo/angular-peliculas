import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { GenreFormComponent } from "../genre-form/genre-form.component";
import { GenreCreationDTO, GenreDTO } from '../genres';
import { GenresService } from '../genres.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-edit-genre',
  standalone: true,
  imports: [GenreFormComponent, LoadingComponent],
  templateUrl: './edit-genre.component.html',
  styleUrl: './edit-genre.component.css'
})
export class EditGenreComponent implements OnInit {
  // Injects
  private genreServie: GenresService = inject(GenresService);

  @Input({ transform: numberAttribute })
  id!: number;
  genre?: GenreDTO;

  ngOnInit(): void {
    this.genreServie.obtainById(this.id).subscribe((genre) => this.genre = genre);
  }

  saveChanges(genre: GenreCreationDTO): void {
    console.log('Editando el género', genre);
  }
}

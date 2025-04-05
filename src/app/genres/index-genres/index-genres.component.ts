import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenresService } from '../genres.service';
import { GenreDTO } from '../genres';

@Component({
  selector: 'app-index-genres',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './index-genres.component.html',
  styleUrl: './index-genres.component.css'
})
export class IndexGenresComponent {
  genresService: GenresService = inject(GenresService);

  constructor() {
    const genres: GenreDTO[] = this.genresService.obtainAll();
    console.log(genres);
    
  }
}

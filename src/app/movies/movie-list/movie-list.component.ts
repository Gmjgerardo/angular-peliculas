import { CurrencyPipe, DatePipe, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GenericListComponent } from "../../shared/components/generic-list/generic-list.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [DatePipe, UpperCasePipe, CurrencyPipe, NgOptimizedImage, GenericListComponent, MatButtonModule, MatIconModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  @Input({ required: true })
  movies!: any[];

  addMovie() {
    this.movies.push({
      title: 'Star Wars, Episodio III: La Venganza De Los Sith',
      releaseDate: new Date('2005-05-19'),
      price: 500,
      image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg',
    });
  }

  removeMovie(movie: any) {
    const index = this.movies.findIndex((actualMovie: any) => actualMovie.title === movie.title);

    this.movies.splice(index, 1);
  }


}

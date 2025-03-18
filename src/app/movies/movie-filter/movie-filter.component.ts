import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GenreDTO } from '../../genres/genres';
import { MovieListComponent } from "../movie-list/movie-list.component";
import { MovieFilter } from './movieFilter';

@Component({
  selector: 'app-movie-filter',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MovieListComponent],
  templateUrl: './movie-filter.component.html',
  styleUrl: './movie-filter.component.css',
})
export class MovieFilterComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    title: new FormControl<string>(''),
    genreId: new FormControl<number>(0),
    comingSoon: new FormControl<boolean>(false),
    onCinemas: new FormControl<boolean>(false),
  });

  // Static values for testing
  genres: GenreDTO[] = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Comedia' },
    { id: 3, name: 'Horror' },
  ];

  allMovies = [
    {
      title: 'Inside Out 2',
      releaseDate: new Date(),
      price: 1400.99,
      image:
        'https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg?20240514232832',
      genres: [1, 2, 3],
      onCinemas: true,
      comingSoon: false,
    },
    {
      title: 'Moana 2',
      releaseDate: new Date('2016-05-03'),
      price: 300.99,
      image:
        'https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg',
      genres: [2],
      onCinemas: false,
      comingSoon: true,
    },
    {
      title: 'Bad Boys: Ride or Die',
      releaseDate: new Date('2016-05-03'),
      price: 300.99,
      image:
        'https://upload.wikimedia.org/wikipedia/en/8/8b/Bad_Boys_Ride_or_Die_%282024%29_poster.jpg',
      genres: [1],
      onCinemas: false,
      comingSoon: false,
    },
    {
      title: 'Deadpool & Wolverine',
      releaseDate: new Date('2016-05-03'),
      price: 300.99,
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Deadpool_%26_Wolverine_poster.jpg/220px-Deadpool_%26_Wolverine_poster.jpg',
      genres: [],
      onCinemas: false,
      comingSoon: true,
    },
    {
      title: 'Oppenheimer',
      releaseDate: new Date('2016-05-03'),
      price: 300.99,
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg',
      genres: [1, 2],
      onCinemas: true,
      comingSoon: false,
    },
    {
      title: 'The Flash',
      releaseDate: new Date('2016-05-03'),
      price: 300.99,
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/The_Flash_%28film%29_poster.jpg/220px-The_Flash_%28film%29_poster.jpg',
      genres: [2, 3],
      onCinemas: false,
      comingSoon: false,
    },
  ];

  movies = [...this.allMovies];

  ngOnInit(): void {
    this.form.valueChanges.subscribe(values => {
      this.movies = this.allMovies;
      this.searchMovies(values as MovieFilter);
    });
  }

  searchMovies(movieToSearch: MovieFilter): void {
    if (movieToSearch.title)
      this.movies = this.movies.filter(movie => movie.title.toLowerCase().indexOf(movieToSearch.title.toLowerCase()) !== -1);

    if (movieToSearch.genreId)
      this.movies = this.movies.filter(movie => movie.genres.indexOf(movieToSearch.genreId) !== -1);

    if (movieToSearch.onCinemas)
      this.movies = this.movies.filter(movie => movie.onCinemas)

    if (movieToSearch.comingSoon)
      this.movies = this.movies.filter(movie => movie.comingSoon)
  }
}

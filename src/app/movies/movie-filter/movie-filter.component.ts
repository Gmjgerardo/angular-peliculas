import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GenreDTO } from '../../genres/genres';
import { MovieDTO } from '../movies';
import { MovieListComponent } from "../movie-list/movie-list.component";
import { MovieFilter } from './movieFilter';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { GenresService } from '../../genres/genres.service';
import { PaginationDTO } from '../../shared/models/PaginationDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-movie-filter',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
            MatSelectModule, MatCheckboxModule, MovieListComponent, MatPaginatorModule],
  templateUrl: './movie-filter.component.html',
  styleUrl: './movie-filter.component.css',
})
export class MovieFilterComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private location: Location = inject(Location);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private moviesService: MoviesService = inject(MoviesService);
  private genresService: GenresService = inject(GenresService);

  form = this.formBuilder.group({
    title: new FormControl<string>(''),
    genreId: new FormControl<number>(0),
    comingSoon: new FormControl<boolean>(false),
    onCinemas: new FormControl<boolean>(false),
  });

  genres!: GenreDTO[];
  movies!: MovieDTO[];
  totalRecords!: number;
  pagination: PaginationDTO = { page: 1, rowsPerPage: 5 };

  ngOnInit(): void {
    // Obtain initial data for the filter
    this.genresService.obtainForFilter().subscribe({
      next: (genres) => this.genres = genres,
      error: (err) => console.error('An error has occurred when trying to get genres from server', err),
    });

    this.readSearchParameterOnURL();
    this.searchMovies(this.form.value as MovieFilter);

    this.form.valueChanges
    .pipe(debounceTime(300))
    .subscribe(values => {
      this.pagination.page = 1;
      this.searchMovies(values as MovieFilter);
      this.writeSearchParametersOnURL(values as MovieFilter);
    });
  }

  paginate(pagination: PageEvent): void {
    this.pagination = { page: pagination.pageIndex + 1, rowsPerPage: pagination.pageSize };
    this.searchMovies(this.form.value as MovieFilter);
  }

  clearForm(): void {
    this.form.reset({ title: '', genreId: 0, comingSoon: false, onCinemas: false });
  }

  searchMovies(movieToSearch: MovieFilter): void {
    movieToSearch.page = this.pagination.page;
    movieToSearch.rowsPerPage = this.pagination.rowsPerPage;

    this.moviesService.filter(movieToSearch).subscribe({
      next: ({body: movies, headers}) => {
        this.movies = movies ?? [];

        if (headers.get('total-records-count'))
          this.totalRecords = parseInt(headers.get('total-records-count') as string, 10);
      },
      error: (err) => console.error('An error has occurred in filtering movies', err),
    });
  }

  writeSearchParametersOnURL(values: MovieFilter): void {
    const queryString = [];

    if (values.title) queryString.push(`titulo=${encodeURIComponent(values.title)}`);

    if (values.genreId) queryString.push(`genero=${encodeURIComponent(values.genreId)}`);

    if (values.onCinemas) queryString.push(`enCines=${encodeURIComponent(values.onCinemas)}`);

    if (values.comingSoon) queryString.push(`proximamente=${encodeURIComponent(values.comingSoon)}`);

    this.location.replaceState('peliculas/filtrar', queryString.join('&'));
  }

  readSearchParameterOnURL(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let movieObject: MovieFilter | any = {};

      if (params.titulo) {
        movieObject.title = params.titulo;
      }

      if (params.genero) {
        movieObject.genreId = Number(params.genero);
      }

      if (params.enCines) {
        movieObject.onCinemas = Boolean(params.enCines);
      }

      if (params.proximamente) {
        movieObject.comingSoon = Boolean(params.proximamente);
      }

      this.form.patchValue(movieObject);
    });
  }
}

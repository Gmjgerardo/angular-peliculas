import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { CreateActorsComponent } from './actors/create-actors/create-actors.component';
import { IndexCinemasComponent } from './cinemas/index-cinemas/index-cinemas.component';
import { CreateCinemaComponent } from './cinemas/create-cinema/create-cinema.component';
import { CreateMoviesComponent } from './movies/create-movies/create-movies.component';
import { EditGenreComponent } from './genres/edit-genre/edit-genre.component';
import { EditActorComponent } from './actors/edit-actor/edit-actor.component';
import { EditCinemaComponent } from './cinemas/edit-cinema/edit-cinema.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'peliculas/crear', component: CreateMoviesComponent },
  { path: 'peliculas/editar/:id', component: EditMovieComponent },
  { path: 'generos', component: IndexGenresComponent },
  { path: 'generos/crear', component: CreateGenreComponent },
  { path: 'generos/editar/:id', component: EditGenreComponent },
  { path: 'actores', component: IndexActorsComponent },
  { path: 'actores/crear', component: CreateActorsComponent },
  { path: 'actores/editar/:id', component: EditActorComponent },
  { path: 'cines', component: IndexCinemasComponent },
  { path: 'cines/crear', component: CreateCinemaComponent },
  { path: 'cines/editar/:id', component: EditCinemaComponent },
];

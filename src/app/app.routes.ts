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
import { MovieFilterComponent } from './movies/movie-filter/movie-filter.component';
import { DetailMovieComponent } from './movies/detail-movie/detail-movie.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { IndexUsersComponent } from './users/index-users/index-users.component';
import { isAdminGuard } from './shared/guards/is-admin.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: 'peliculas/crear', component: CreateMoviesComponent, canActivate: [isAdminGuard] },
  { path: 'peliculas/editar/:id', component: EditMovieComponent, canActivate: [isAdminGuard] },
  { path: 'peliculas/filtrar', component: MovieFilterComponent },
  { path: 'peliculas/:id', component: DetailMovieComponent },
  { path: 'generos', component: IndexGenresComponent, canActivate: [isAdminGuard] },
  { path: 'generos/crear', component: CreateGenreComponent, canActivate: [isAdminGuard] },
  { path: 'generos/editar/:id', component: EditGenreComponent, canActivate: [isAdminGuard] },
  { path: 'actores', component: IndexActorsComponent, canActivate: [isAdminGuard] },
  { path: 'actores/crear', component: CreateActorsComponent, canActivate: [isAdminGuard] },
  { path: 'actores/editar/:id', component: EditActorComponent, canActivate: [isAdminGuard] },
  { path: 'cines', component: IndexCinemasComponent, canActivate: [isAdminGuard] },
  { path: 'cines/crear', component: CreateCinemaComponent, canActivate: [isAdminGuard] },
  { path: 'cines/editar/:id', component: EditCinemaComponent, canActivate: [isAdminGuard] },
  { path: 'usuarios', component: IndexUsersComponent, canActivate: [isAdminGuard] },
  { path: '**', redirectTo: '' },
];

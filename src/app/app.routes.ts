import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IndexGenresComponent } from './genres/index-genres/index-genres.component';
import { CreateGenreComponent } from './genres/create-genre/create-genre.component';
import { IndexActorsComponent } from './actors/index-actors/index-actors.component';
import { CreateActorsComponent } from './actors/create-actors/create-actors.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'generos', component: IndexGenresComponent },
  { path: 'generos/crear', component: CreateGenreComponent },
  { path: 'actores', component: IndexActorsComponent },
  { path: 'actores/crear', component: CreateActorsComponent },
];

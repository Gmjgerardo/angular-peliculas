import { ActorAutocompleteDTO } from "../actors/actors";
import { CinemaDTO } from "../cinemas/cinemas";
import { GenreDTO } from "../genres/genres";

export interface MovieDTO {
  id: number;
  title: string;
  releaseDate: Date;
  trailer?: string;
  image?: string;
}

export interface MovieCreateDTO {
  title: string;
  releaseDate: Date;
  trailer?: string;
  image?: File;
  genresIds?: number[];
  cinemasIds?: number[];
  actors?: ActorAutocompleteDTO[];
}

export interface MoviePostGetDTO {
  genres: GenreDTO[];
  cinemas: CinemaDTO[];
}

export interface LandingPageDTO {
  onCinemas: MovieDTO[];
  upcoming: MovieDTO[];
}

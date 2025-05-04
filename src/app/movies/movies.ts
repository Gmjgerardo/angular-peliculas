import { ActorAutocompleteDTO } from "../actors/actors";

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

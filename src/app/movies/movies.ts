export interface MovieDTO {
  id: number;
  title: string;
  releaseDate: Date;
  trailer?: string;
  image?: string;
}

export interface MovieCreateDTO {
  id: number;
  title: string;
  releaseDate: Date;
  trailer?: string;
  image?: File;
  genresIds?: number[];
}

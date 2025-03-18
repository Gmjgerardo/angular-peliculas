export interface CinemaDTO {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface CinemaCreateDTO {
  name: string;
  lat: number;
  lng: number;
}
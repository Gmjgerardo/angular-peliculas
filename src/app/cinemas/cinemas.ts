export interface CinemaDTO {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface CinemaCreateDTO {
  name: string;
  latitude: number;
  longitude: number;
}
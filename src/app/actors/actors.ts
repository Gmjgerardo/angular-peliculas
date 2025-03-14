export interface ActorDTO {
  id: number;
  name: string;
  birthDate: Date | null;
}

export interface ActorCreateDTO {
  name: string;
  birthDate: Date;
}

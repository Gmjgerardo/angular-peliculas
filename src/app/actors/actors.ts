export interface ActorDTO {
  id: number;
  name: string;
  birthDate: Date | null;
  profileImage?: string;
}

export interface ActorCreateDTO {
  name: string;
  birthDate: Date;
  profileImage?: File;
}

import { Injectable } from '@angular/core';
import { GenreDTO } from './genres';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor() { }

  public obtainAll(): GenreDTO[] {
    return [{ id: 1, name: 'Drama' }];
  }
}

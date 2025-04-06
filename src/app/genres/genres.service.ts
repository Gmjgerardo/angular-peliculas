import { inject, Injectable } from '@angular/core';
import { GenreDTO } from './genres';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  public obtainAll(): Observable<GenreDTO[]> {
    return this.http.get<GenreDTO[]>("https://localhost:7165/api/Genres");
  }
}

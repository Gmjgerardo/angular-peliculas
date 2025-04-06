import { inject, Injectable } from '@angular/core';
import { GenreDTO } from './genres';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private http: HttpClient = inject(HttpClient);
  private baseURL:string = `${environment.apiURL}/genres`;

  constructor() { }

  public obtainAll(): Observable<GenreDTO[]> {
    return this.http.get<GenreDTO[]>(this.baseURL);
  }
}

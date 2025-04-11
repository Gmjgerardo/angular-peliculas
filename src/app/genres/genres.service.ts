import { inject, Injectable } from '@angular/core';
import { GenreCreationDTO, GenreDTO } from './genres';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginationDTO } from '../shared/models/PaginationDTO';
import { generateQueryParams } from '../shared/functions';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private http: HttpClient = inject(HttpClient);
  private baseURL:string = `${environment.apiURL}/genres`;

  constructor() { }

  public obtainAll(pagination: PaginationDTO): Observable<HttpResponse<GenreDTO[]>> {
    const queryParams = generateQueryParams(pagination);

    return this.http.get<GenreDTO[]>(this.baseURL, {
      params: queryParams,
      observe: 'response',
    });
  }

  public obtainById(id: number): Observable<GenreDTO> {
    return this.http.get<GenreDTO>(`${this.baseURL}/${id}`);
  }

  public create(genre: GenreCreationDTO): Observable<GenreDTO> {
    return this.http.post(this.baseURL, genre) as Observable<GenreDTO>;
  }

  public update(id: number, genre: GenreCreationDTO): Observable<GenreCreationDTO> {
    return this.http.put<GenreCreationDTO>(`${this.baseURL}/${id}`, genre);
  }

  public delete(id: number) : Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}

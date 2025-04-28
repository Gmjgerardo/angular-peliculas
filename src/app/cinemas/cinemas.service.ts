import { inject, Injectable } from '@angular/core';
import { ICRUDService } from '../shared/interfaces/ICRUDService';
import { CinemaCreateDTO, CinemaDTO } from './cinemas';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationDTO } from '../shared/models/PaginationDTO';
import { environment } from '../../environments/environment';
import { generateQueryParams } from '../shared/functions';

@Injectable({
  providedIn: 'root'
})
export class CinemasService implements ICRUDService<CinemaDTO, CinemaCreateDTO> {
  private http: HttpClient = inject(HttpClient);
  private baseURL: string = `${environment.apiURL}/cinemas`;

  constructor() { }

  obtainAll(pagination: PaginationDTO): Observable<HttpResponse<CinemaDTO[]>> {
    return this.http.get<CinemaDTO[]>(this.baseURL, {
      params: generateQueryParams(pagination),
      observe: 'response',
    });
  }

  obtainById(id: number): Observable<CinemaDTO> {
    return this.http.get<CinemaDTO>(`${this.baseURL}/${id}`);
  }

  create(cinema: CinemaCreateDTO): Observable<CinemaDTO> {
    return this.http.post<CinemaDTO>(this.baseURL, cinema);
  }

  update(id: number, cinema: CinemaCreateDTO): Observable<CinemaCreateDTO> {
    return this.http.put<CinemaCreateDTO>(`${this.baseURL}/${id}`, cinema);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}

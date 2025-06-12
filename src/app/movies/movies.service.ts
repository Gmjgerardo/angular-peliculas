import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICRUDService } from '../shared/interfaces/ICRUDService';
import { MovieCreateDTO, MovieDTO, MoviePostGetDTO, LandingPageDTO, MoviePutGetDTO } from './movies';
import { Observable } from 'rxjs';
import { PaginationDTO } from '../shared/models/PaginationDTO';
import { ActorAutocompleteDTO } from '../actors/actors';

@Injectable({
  providedIn: 'root'
})
export class MoviesService implements ICRUDService<MovieDTO, MovieCreateDTO> {
  private http: HttpClient = inject(HttpClient);
  private baseURL: string = `${environment.apiURL}/movies`;

  constructor() { }

  public getLandingPageData(): Observable<LandingPageDTO> {
    return this.http.get<LandingPageDTO>(`${this.baseURL}/landing`);
  }

  public createGet(): Observable<MoviePostGetDTO> {
    return this.http.get<MoviePostGetDTO>(`${this.baseURL}/PostGet`);
  }

  public obtainAll(pagination: PaginationDTO): Observable<HttpResponse<MovieDTO[]>> {
    throw new Error('Method not implemented.');
  }

  public obtainById(id: number): Observable<MovieDTO> {
    throw new Error('Method not implemented.');
  }

  public obtainActorByName(name: string): Observable<ActorAutocompleteDTO[]> {
    return this.http.get<ActorAutocompleteDTO[]>(`${this.baseURL}/${name}`);
  }

  public create(movieCreate: MovieCreateDTO): Observable<MovieDTO> {
    const formData = this.constructFormData(movieCreate);

    return this.http.post<MovieDTO>(this.baseURL, formData);
  }

  public updateGet(id: number): Observable<MoviePutGetDTO> {
    return this.http.get<MoviePutGetDTO>(`${this.baseURL}/PutGet/${id}`);
  }

  public update(id: number, movie: MovieCreateDTO): Observable<MovieCreateDTO> {
    const formData = this.constructFormData(movie);
    return this.http.put<MovieCreateDTO>(`${this.baseURL}/${id}`, formData);
  }

  public delete(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  private constructFormData(movie: MovieCreateDTO): FormData {
    const formData: FormData = new FormData();

    formData.append('title', movie.title);
    formData.append('releaseDate', movie.releaseDate?.toLocaleDateString());

    if (movie.trailer) formData.append('trailer', movie.trailer);
    if (movie.image) formData.append('image', movie.image);

    formData.append('genresIds', JSON.stringify(movie.genresIds));
    formData.append('cinemasIds', JSON.stringify(movie.cinemasIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;
  }
}

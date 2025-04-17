import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActorCreateDTO, ActorDTO } from './actors';
import { Observable } from 'rxjs';
import { PaginationDTO } from '../shared/models/PaginationDTO';
import { generateQueryParams } from '../shared/functions';
import { ICRUDService } from '../shared/interfaces/ICRUDService';

@Injectable({
  providedIn: 'root'
})
export class ActorsService implements ICRUDService<ActorDTO, ActorCreateDTO> {
  private http: HttpClient = inject(HttpClient);
  private baseURL: string = `${environment.apiURL}/actors`;

  constructor() { }

  public obtainAll(pagination: PaginationDTO): Observable<HttpResponse<ActorDTO[]>> {
    return this.http.get<ActorDTO[]>(this.baseURL, {
      params: generateQueryParams(pagination),
      observe: 'response',
    });
  }

  public create(actor: ActorCreateDTO): Observable<ActorDTO> {
    const data: FormData = this.constructFormData(actor);
    return this.http.post<ActorDTO>(this.baseURL, data);
  };

  public obtainById(id: number): Observable<ActorDTO> {
    return this.http.get<ActorDTO>(`${this.baseURL}/${id}`);
  }

  public update(id: number, actor: ActorCreateDTO): Observable<ActorCreateDTO> {
    return this.http.put<ActorCreateDTO>(`${this.baseURL}/${id}`, this.constructFormData(actor));
  }

  public delete(id: number): Observable<Object> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  private constructFormData(actor: ActorCreateDTO): FormData {
    const formData: FormData = new FormData();

    formData.append('name', actor.name);
    formData.append('birthDate', actor.birthDate?.toISOString());

    if (actor.profileImage)
      formData.append('profileImage', actor.profileImage);

    return formData;
  }
}

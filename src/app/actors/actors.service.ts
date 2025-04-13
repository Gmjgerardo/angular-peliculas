import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActorCreateDTO, ActorDTO } from './actors';
import { Observable } from 'rxjs';
import { PaginationDTO } from '../shared/models/PaginationDTO';
import { generateQueryParams } from '../shared/functions';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  private http: HttpClient = inject(HttpClient);
  private baseURL: string = `${environment.apiURL}/actors`;

  constructor() { }

  public obtainAll(pagination: PaginationDTO): Observable<HttpResponse<ActorDTO[]>> {
    return this.http.get<ActorDTO[]>(this.baseURL, {
      params: generateQueryParams(pagination),
      observe: 'response',
    });
  }

  public create(actor: ActorCreateDTO): Observable<ActorCreateDTO> {
    const data: FormData = this.constructFormData(actor);
    return this.http.post<ActorCreateDTO>(this.baseURL, data);
  };

  private constructFormData(actor: ActorCreateDTO): FormData {
    const formData: FormData = new FormData();

    formData.append('name', actor.name);
    formData.append('birthDate', actor.birthDate?.toISOString());

    if (actor.profileImage)
      formData.append('profileImage', actor.profileImage);

    return formData;
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActorCreateDTO } from './actors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  private http: HttpClient = inject(HttpClient);
  private baseURL: string = `${environment.apiURL}/actors`;

  constructor() { }

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

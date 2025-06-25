import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaginationDTO } from '../shared/models/PaginationDTO';
import { Observable } from 'rxjs';
import { UserDTO } from './users';
import { generateQueryParams } from '../shared/functions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http: HttpClient = inject(HttpClient);
  private baseURL: string = `${environment.apiURL}/users`;

  constructor() { }

  getUsers(pagination: PaginationDTO): Observable<HttpResponse<UserDTO[]>> {
    return this.http.get<UserDTO[]>(`${this.baseURL}/all`, {
      params: generateQueryParams(pagination),
      observe: 'response',
    });
  }
}

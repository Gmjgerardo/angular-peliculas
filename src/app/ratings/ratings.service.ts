import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RatingCreateDTO } from './ratings';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  private http: HttpClient = inject(HttpClient);
  private baseURL: string = `${environment.apiURL}/ratings`;

  constructor() { }

  rateMovie(rateDTO: RatingCreateDTO) {
    return this.http.post(`${this.baseURL}`, rateDTO);
  }
}

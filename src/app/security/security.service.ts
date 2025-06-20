import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationResponseDTO, UserCredentialsDTO } from './security';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private http: HttpClient = inject(HttpClient);
  private baseURL = `${environment.apiURL}/users`;

  private readonly tokenKey = 'token';
  private readonly expirationKey = 'token-expiration';

  constructor() { }

  private writeToken(response: AuthenticationResponseDTO): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.expirationKey, response.expiration.toString());
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationKey);
  }

  register(credentials: UserCredentialsDTO): Observable<AuthenticationResponseDTO> {
    return this.http.post<AuthenticationResponseDTO>(`${this.baseURL}/register`, credentials)
      .pipe(tap(authenticationResponse => this.writeToken(authenticationResponse)));
  }

  login(credentials: UserCredentialsDTO): Observable<AuthenticationResponseDTO> {
    return this.http.post<AuthenticationResponseDTO>(`${this.baseURL}/login`, credentials)
      .pipe(tap(authenticationResponse => this.writeToken(authenticationResponse)));
  }

  logout(): void {
    this.removeToken();
  }

  getJWTField(field: string): string {
    const token = localStorage.getItem(this.tokenKey);

    const fieldData: string = token
    ? JSON.parse(atob(token.split('.')[1]))[field]
    : '';

    return fieldData;
  }

  isLogged(): boolean {
    const expiration: Date = new Date(localStorage.getItem(this.expirationKey)!);

    if (expiration <= new Date())
      this.removeToken();

    return localStorage.getItem(this.tokenKey) != null;
  };

  getRoles(): string[] {
    return ['admin'];
  }
}

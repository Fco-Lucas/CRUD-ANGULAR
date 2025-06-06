import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { LoginCredentials, LoginResponse } from '../models/auth.models';
import { Router } from '@angular/router';
import { CookieService } from './cookies.service';

const API_BASE_URL = 'http://localhost:8181/api/v1/';
const AUTH_TOKEN_COOKIE_NAME = 'jwt_auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private cookieService = inject(CookieService);

  // BehaviorSubject para rastrear o estado de autenticação baseado na presença do token no cookie
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.getToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Verifica o estado de autenticação ao iniciar o serviço
    this.checkInitialAuthState();
    console.log('AuthService initialized. Token from cookie:', this.getToken());
  }

  private checkInitialAuthState(): void {
    const token = this.getToken();
    this.isAuthenticatedSubject.next(!!token);
  }

  private storeToken(token: string): void {
    // Armazena o token no cookie. Expira em 7 dias.
    this.cookieService.set(AUTH_TOKEN_COOKIE_NAME, token, 7);
    this.isAuthenticatedSubject.next(true);
  }

  private removeToken(): void {
    this.cookieService.delete(AUTH_TOKEN_COOKIE_NAME);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return this.cookieService.get(AUTH_TOKEN_COOKIE_NAME);
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_BASE_URL}auth`, credentials)
      .pipe(
        tap(response => {
          this.storeToken(response.token);
          console.log('Login successful, token stored in cookie.');
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/auth/login']);
    console.log('User logged out, token removed from cookie.');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message || error.statusText}`;
      if (error.error && typeof error.error.message === 'string') {
        errorMessage += ` - ${error.error.message}`;
      } else if (error.error && typeof error.error === 'object' && error.error.message) {
         errorMessage += ` - ${error.error.message}`;
      }
    }
    console.error('AuthService API error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
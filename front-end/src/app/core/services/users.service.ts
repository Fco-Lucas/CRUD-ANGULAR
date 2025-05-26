import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CreateUserInterface, User } from "../models/users.models";
import { catchError, throwError, Observable, tap } from "rxjs";

const API_BASE_URL = 'http://localhost:8181/api/v1/';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor() { }

  private http = inject(HttpClient);

  register(body: CreateUserInterface): Observable<User> {
    return this.http.post<User>(`${API_BASE_URL}users`, body)
      .pipe(
        tap(response => {
            response
        }),
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message || error.statusText}`;
      if (error.error && typeof error.error.message === 'string') {
        errorMessage = ` ${error.error.message}`;
      } else if (error.error && typeof error.error === 'object' && error.error.message) {
         errorMessage = ` ${error.error.message}`;
      }
    }
    console.error('UserService API error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LoginFormValues } from '../../features/auth/components/login-form/login-form.component';
import { RegisterFormValuesResponse } from '../../features/auth/components/register-form/register-form.component';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { AUTH_ENDPOINTS } from '../constants/api.constants';
import { TokenService } from './token.service';
import { NotificationService } from '../services/notification.service'; // Para feedback

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject para gerenciar o estado de autenticação do usuário
  // null = não autenticado, User = autenticado
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  // Flag para indicar se o usuário está autenticado (baseado na presença do token)
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    // Ao iniciar o serviço, verifica se já existe um token e um usuário logado
    this.loadUserFromToken();
  }

  /**
   * Tenta carregar o usuário e o estado de autenticação a partir de um token existente.
   * Ideal para quando a página é recarregada.
   */
  private loadUserFromToken(): void {
    const token = this.tokenService.getToken();
    if (token) {
      // TODO: Em um cenário real, você decodificaria o JWT para obter o usuário
      // ou faria uma chamada a um endpoint de /profile para buscar os dados do usuário.
      // Por enquanto, vamos simular um usuário genérico ou usar os dados do login.
      // Para simular, podemos guardar o user no localStorage junto com o token
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user: User = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this._isAuthenticated.next(true);
      } else {
        // Se tem token mas não tem user, talvez o token esteja desatualizado ou falhou o profile
        this.logout();
      }
    } else {
      this.currentUserSubject.next(null);
      this._isAuthenticated.next(false);
    }
  }

  /**
   * Realiza a requisição de login na API.
   * @param credentials Credenciais do usuário (email, password).
   * @returns Observable da resposta de autenticação.
   */
  login(credentials: LoginFormValues): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials).pipe(
      tap(response => {
        this.tokenService.saveToken(response.accessToken);
        // Opcional: Salvar refresh token
        if (response.refreshToken) {
          this.tokenService.saveRefreshToken(response.refreshToken);
        }
        this.currentUserSubject.next(response.user);
        localStorage.setItem('currentUser', JSON.stringify(response.user)); // Simulação
        this._isAuthenticated.next(true);
        this.notificationService.success('Login bem-sucedido!');
      }),
      catchError(error => {
        this.handleAuthError(error);
        return throwError(() => new Error(error.error?.message || 'Erro ao fazer login'));
      })
    );
  }

  /**
   * Realiza a requisição de registro na API.
   * @param userData Dados do usuário para registro.
   * @returns Observable da resposta de autenticação (ou de sucesso do registro).
   */
  register(userData: RegisterFormValuesResponse): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, userData).pipe(
      tap(response => {
        // Após o registro, pode-se logar o usuário automaticamente ou redirecionar para o login
        // Se a API retornar token após registro, faça o saveToken aqui
        this.notificationService.success('Registro realizado com sucesso! Faça login para continuar.');
      }),
      catchError(error => {
        this.handleAuthError(error);
        return throwError(() => new Error(error.error?.message || 'Erro ao registrar'));
      })
    );
  }

  /**
   * Realiza o logout do usuário, removendo tokens e redirecionando.
   */
  logout(): void {
    this.tokenService.clearTokens(); // Limpa todos os tokens
    localStorage.removeItem('currentUser'); // Limpa a simulação do usuário
    this.currentUserSubject.next(null);
    this._isAuthenticated.next(false);
    this.notificationService.info('Sessão encerrada. Você foi desconectado.');
    this.router.navigate(['/auth/login']); // Redireciona para a tela de login
  }

  /**
   * Retorna o usuário logado atualmente (apenas o valor, não o Observable).
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  /**
   * Lida com erros comuns de autenticação.
   * @param error O objeto de erro HTTP.
   */
  private handleAuthError(error: any): void {
    // Pode ter uma lógica mais complexa aqui para diferentes códigos de erro
    if (error.status === 401 || error.status === 403) {
      // Se for um erro de autenticação/autorização, força o logout
      this.notificationService.error('Sessão expirada ou acesso negado. Faça login novamente.');
      this.logout();
    } else {
      // Outros erros genéricos
      this.notificationService.error(error.error?.message || 'Ocorreu um erro. Tente novamente mais tarde.');
    }
  }

  // TODO: Adicionar método para refresh de token se sua API suportar
  // refreshToken(): Observable<AuthResponse> { ... }
}
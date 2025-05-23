import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { AuthService } from './auth.service'; // Importe o AuthService para usar o logout

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);
  const authService = inject(AuthService); // Injeta o AuthService aqui

  const token = tokenService.getToken();

  // Clona a requisição e adiciona o cabeçalho Authorization se um token existir
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Continua com a requisição e intercepta a resposta
  return next(req).pipe(
    catchError(error => {
      // Intercepta erros HTTP
      if (error.status === 401 || error.status === 403) {
        // Se a requisição retornou 401 (Não Autorizado) ou 403 (Proibido)
        // Isso pode significar token inválido ou expirado
        notificationService.error('Sessão expirada ou acesso negado. Faça login novamente.');
        authService.logout(); // Força o logout através do AuthService
        router.navigate(['/auth/login']); // Redireciona para a tela de login
      }
      // Re-lança o erro para que outros `catchError` no serviço ou componente possam tratá-lo
      return throwError(() => error);
    })
  );
};
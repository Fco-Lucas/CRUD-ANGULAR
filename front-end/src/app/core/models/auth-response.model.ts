// src/app/core/models/auth-response.model.ts
import { User } from './user.model';

export interface AuthResponse {
  accessToken: string; // Ou 'token', 'jwt', conforme sua API
  refreshToken?: string; // Se sua API usa refresh tokens
  user: User; // Dados do usuário logado
  expiresIn?: number; // Tempo de expiração do token, em segundos
}
// src/app/core/auth/token.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'accessToken'; // Chave para armazenar o token
  private readonly REFRESH_TOKEN_KEY = 'refreshToken'; // Chave para o refresh token, se aplicável

  constructor() { }

  /**
   * Salva o token de acesso no armazenamento local.
   * @param token O token de acesso.
   */
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Obtém o token de acesso do armazenamento local.
   * @returns O token de acesso ou null se não encontrado.
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Remove o token de acesso do armazenamento local.
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Salva o refresh token (se aplicável).
   * @param refreshToken O refresh token.
   */
  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  /**
   * Obtém o refresh token.
   * @returns O refresh token ou null.
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Remove o refresh token.
   */
  removeRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Limpa todos os tokens armazenados.
   */
  clearTokens(): void {
    localStorage.clear(); // Ou remova individualmente se tiver outras coisas no localStorage
  }

  /**
   * Verifica se o token existe, indicando uma sessão ativa.
   * Não valida se o token é válido ou expirado, apenas a presença.
   * @returns True se o token existe, false caso contrário.
   */
  hasToken(): boolean {
    return !!this.getToken();
  }
}
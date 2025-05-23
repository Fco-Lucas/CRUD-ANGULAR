import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root' // Torna o serviço um singleton e disponível globalmente
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Exibe uma mensagem de sucesso (verde).
   * @param message A mensagem a ser exibida.
   * @param action O texto da ação (ex: "Fechar").
   * @param duration A duração em milissegundos (padrão: 3000ms).
   */
  success(message: string, action: string = 'Fechar', duration: number = 3000): void {
    this.show(message, action, duration, ['snackbar-success']);
  }

  /**
   * Exibe uma mensagem de erro (vermelho).
   * @param message A mensagem a ser exibida.
   * @param action O texto da ação (ex: "Fechar").
   * @param duration A duração em milissegundos (padrão: 5000ms).
   */
  error(message: string, action: string = 'Fechar', duration: number = 5000): void {
    this.show(message, action, duration, ['snackbar-error']);
  }

  /**
   * Exibe uma mensagem de informação (azul/padrão do Material).
   * @param message A mensagem a ser exibida.
   * @param action O texto da ação (ex: "Fechar").
   * @param duration A duração em milissegundos (padrão: 3000ms).
   */
  info(message: string, action: string = 'Fechar', duration: number = 3000): void {
    this.show(message, action, duration, ['snackbar-info']); // ou apenas [] para o estilo padrão
  }

  /**
   * Método interno para exibir o snackbar com configurações personalizadas.
   * @param message A mensagem a ser exibida.
   * @param action O texto da ação.
   * @param duration A duração em milissegundos.
   * @param panelClass As classes CSS para estilizar o painel do snackbar.
   */
  private show(message: string, action: string, duration: number, panelClass: string[]): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: panelClass,
      horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top'   // 'top' | 'bottom'
    };
    this.snackBar.open(message, action, config);
  }
}
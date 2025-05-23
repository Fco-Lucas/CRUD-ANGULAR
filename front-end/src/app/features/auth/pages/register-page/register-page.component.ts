import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { RegisterFormComponent, RegisterFormValuesResponse } from '../../components/register-form/register-form.component';
import { AuthService } from '../../../../core/auth/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    RegisterFormComponent // Importa o componente do formulário de registro
  ],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService 
  ) {}

  // Método que será chamado quando o formulário de registro for submetido
  async onRegisterFormSubmit(formData: RegisterFormValuesResponse) {
    this.isLoading = true;
    
    await new Promise(resolve => setTimeout(resolve, 4000));

    this.authService.register(formData).pipe(
      finalize(() => { this.isLoading = false; })
    ).subscribe({
      next: (response) => {
        console.log('Registro bem-sucedido!', response);
        this.router.navigate(['/auth/login']); // Redirecionar para a página de login
      },
      error: (error) => {
        console.error('Erro de registro capturado na página:', error);
      }
    });
  }
}
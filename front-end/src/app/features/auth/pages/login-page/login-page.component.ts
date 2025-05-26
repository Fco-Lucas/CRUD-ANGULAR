import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginFormValues } from '../../models/login.modules';
import { LoginCredentials } from '../../../../core/models/auth.models';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ CommonModule, RouterModule, LoginFormComponent, MatSnackBarModule ],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  isLoading = false;
  errorMessage: string | null = null;
  private returnUrl: string = '/home'; // Rota padrão após login

  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // Para pegar returnUrl
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Se o usuário já estiver autenticado, redireciona para home
    if (this.authService.getToken()) {
      this.router.navigate([this.returnUrl]);
    }
    // Pega a URL de retorno dos queryParams, se existir
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/home';
    });
  }

  handleLoginSubmit(formValues: LoginFormValues): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.cdr.detectChanges();

    const credentials: LoginCredentials = { // A interface correta é LoginCredentials
      cpf: formValues.cpf || '',
      password: formValues.password || '',
    };

    this.authService.login(credentials).subscribe({
      next: () => { // A resposta (response) não é explicitamente usada aqui, mas o token é tratado no service
        this.isLoading = false;
        this.cdr.detectChanges();
        this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
          duration: 3000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['success-snackbar']
        });
        this.router.navigateByUrl(this.returnUrl); // Usa navigateByUrl para URLs completas
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.snackBar.open(this.errorMessage ?? "Falha no login.", 'Fechar', {
          duration: 5000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['error-snackbar']
        });
        console.error('Erro no login:', err);
      },
    });
  }
}

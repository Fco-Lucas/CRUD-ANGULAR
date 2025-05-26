import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { RegisterFormValues } from '../../models/register.modules';
import { UserService } from '../../../../core/services/users.service';
import { CreateUserInterface } from '../../../../core/models/users.models';

@Component({
  selector: 'app-register-page',
  imports: [
    RegisterFormComponent, 
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  isLoading: boolean = false;
  errorMessage: string | null = null;

  handleRegisterSubmit(formValues: RegisterFormValues): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.cdr.detectChanges();

    const credentials: CreateUserInterface = {
      name: formValues.name || '',
      cpf: formValues.cpf || '',
      password: formValues.password || '',
    };

    this.userService.register(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
          duration: 3000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['success-snackbar']
        });
        this.router.navigateByUrl("/auth/login");
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
        this.cdr.detectChanges();
        this.snackBar.open(this.errorMessage ?? "Falha no login.", 'Fechar', {
          duration: 5000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['error-snackbar']
        });
      }
    });
  }
}

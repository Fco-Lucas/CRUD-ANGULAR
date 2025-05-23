import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

export interface LoginFormValues {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    ReactiveFormsModule, // Essencial para Formulários Reativos
    RouterModule,
    MatCardModule,       // Componente de Card do Material
    MatFormFieldModule,  // Campo de formulário do Material
    MatInputModule,      // Input de texto do Material
    MatButtonModule,     // Botão do Material
    MatIconModule        // Ícones do Material (opcional, mas bom ter)
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  // EventEmitter para enviar os dados do formulário para o componente pai (LoginPageComponent)
  @Output()
  submitForm = new EventEmitter<LoginFormValues>();

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });

  onSubmit() {
    if(!this.loginForm.valid) {
      console.error(this.loginForm.errors);
      return;
    }

    this.submitForm.emit(this.loginForm.value as LoginFormValues);
  }
}

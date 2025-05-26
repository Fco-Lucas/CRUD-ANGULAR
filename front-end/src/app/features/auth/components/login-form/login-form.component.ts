import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

import { MaterialImports } from '../../../../shared/material.imports';

import { LoginFormValues } from '../../models/login.modules';

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskDirective,
    ...MaterialImports
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  // Dispara um evento para a página na qual irá importar o componente
  @Output()
  submitForm = new EventEmitter<LoginFormValues>();

  @Input()
  isLoading: boolean = false;

  loginForm = new FormGroup({
    cpf: new FormControl("", [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern("^[0-9]*$") // Aceita apenas números
    ]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]) // Exemplo de minlength para senha
  });


  onSubmit() {
    // Marca todos os campos como tocados para exibir erros imediatamente
    this.loginForm.markAllAsTouched();

    if(!this.loginForm.valid) {
      console.error(this.loginForm.errors);
      return;
    }

    this.submitForm.emit(this.loginForm.value as LoginFormValues);
  }

  get cpfControl() {
    return this.loginForm.get('cpf');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  isSubmitButtonDisabled(): boolean {
    return this.loginForm.invalid || this.isLoading;
  }
}

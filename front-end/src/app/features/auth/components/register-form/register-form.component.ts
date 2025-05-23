import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';

import { MaterialImports } from '../../../../shared/material.imports';

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormValuesResponse {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: "app-register-form",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...MaterialImports
  ],
  templateUrl: "./register-form.component.html"
})
export class RegisterFormComponent {
  @Output()
  submitForm = new EventEmitter<RegisterFormValuesResponse>();

  @Input()
  isLoading: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: passwordMatchValidator('password', 'confirmPassword') });

  onSubmit() {
    // Marca todos os campos como tocados para exibir erros imediatamente
    this.registerForm.markAllAsTouched();

    if(!this.registerForm.valid) return console.error('Formulário inválido. Verifique os campos.', this.registerForm.errors);

    const { confirmPassword, ...dataToSend } = this.registerForm.value as RegisterFormValues;
    this.submitForm.emit(dataToSend);
    // this.registerForm.reset();
  }

  isSubmitButtonDisabled(): boolean {
    return this.registerForm.invalid || this.isLoading;
  }
}
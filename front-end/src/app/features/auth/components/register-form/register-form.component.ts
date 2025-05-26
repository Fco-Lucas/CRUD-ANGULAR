import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialImports } from '../../../../shared/material.imports';

import { RegisterFormValues } from '../../models/register.modules';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-register-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskDirective,
    ...MaterialImports
  ],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  @Output()
  submitForm = new EventEmitter<RegisterFormValues>();

  @Input()
  isLoading: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(255)]),
    cpf: new FormControl("", [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern("^[0-9]*$") // Aceita apenas números
    ]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    if(!this.registerForm.valid) {
      console.error(this.registerForm.errors)
      return;
    }

    this.submitForm.emit(this.registerForm.value as RegisterFormValues);
  }

  get nameControl () {
    return this.registerForm.get("name");
  }
  get cpfControl() {
    return this.registerForm.get("cpf");
  }
  get passwordControl() {
    return this.registerForm.get("password");
  }

  isSubmitButtonDisabled(): boolean {
    return this.registerForm.invalid || this.isLoading;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

import { MaterialImports } from '../../../../shared/material.imports';

import { UserFormFiltersValues } from '../../models/users.models';

@Component({
  selector: 'app-users-filters',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    ...MaterialImports
  ],
  templateUrl: './users-filters.component.html',
})
export class UsersFiltersComponent {
  @Output()
  submitForm = new EventEmitter<UserFormFiltersValues>();

  @Input()
  isLoading: boolean = false;

  filtersForm = new FormGroup({
    name: new FormControl("", []),
    cpf: new FormControl("", []),
  });

  onSubmit() {
    if(!this.filtersForm.valid) {
      console.error(this.filtersForm.errors)
      return;
    }

    this.submitForm.emit(this.filtersForm.value as UserFormFiltersValues);
  }

  get cpfControl() {
    return this.filtersForm.get("cpf");
  }

  isSubmitButtonDisabled(): boolean {
    return this.filtersForm.invalid || this.isLoading;
  }
}

import { Component } from '@angular/core';
import { LoginFormComponent, LoginFormValues } from '../../components/login-form/login-form.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [
    CommonModule,
    LoginFormComponent
  ]
})
export class LoginPageComponent {
  constructor(
    private router: Router,
  ) {}

  onLoginFormSubmit(formData: LoginFormValues) {
    console.log(formData);
  }
}

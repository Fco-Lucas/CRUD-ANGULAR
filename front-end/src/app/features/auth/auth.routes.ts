import { Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";

export const AUTH_ROUTES: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "", redirectTo: "login", pathMatch: "full" }, // Redireciona a rota pai para 'login'
]
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./features/auth/auth.routes").then(m => m.AUTH_ROUTES)
  },
  {
    path: 'home', // Sua nova página home
    loadComponent: () => import('./features/home/pages/home-page/home-page.component').then(m => m.HomePageComponent), // Crie este componente
    canActivate: [authGuard],
    title: 'Página Inicial'
  },
  { path: "", redirectTo: "/home", pathMatch: "full" }, // Redireciona para home por padrão (se autenticado, senão o guard redireciona para login)
  {
    path: '**',
    loadComponent: () => import('./core/pages/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent),
    title: 'Página não encontrada'
  }
];

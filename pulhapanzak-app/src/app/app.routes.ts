import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: '**',
    redirectTo: 'login-page',
    pathMatch: 'full',
  },
  {
    path: 'login-page',
    loadComponent: () => import('./auth/ui/pages/login-page/login-page.page').then( m => m.LoginPage)
  },
  {
    path: 'register-page',
    loadComponent: () => import('./auth/ui/pages/register-page/register-page.page').then( m => m.RegisterPage)
  },
  {
    path: '',
    loadChildren: () => import('./shared/ui/pages/tabs/tabs.routes').then(m => m.routes),
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
];

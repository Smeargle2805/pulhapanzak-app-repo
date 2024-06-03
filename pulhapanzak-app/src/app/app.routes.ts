import { Routes } from '@angular/router';

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
];

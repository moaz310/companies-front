import { Routes } from '@angular/router';
import { authenticatedGuard, authenticationGuard } from './guards/authentication.guard';

export const routes: Routes = [
    { path: 'companies', loadComponent: () => import('./components/companies/companies.component').then(m => m.CompaniesComponent), canActivate: [authenticationGuard] },
    { path: 'auth', loadComponent: () => import('./components/authentication/authentication.component').then(m => m.AuthenticationComponent), canActivate: [authenticatedGuard] },
    { path: '', redirectTo: 'companies', pathMatch: 'full' },
];

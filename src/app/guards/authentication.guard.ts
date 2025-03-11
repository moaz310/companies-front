import { CanActivateFn, createUrlTreeFromSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  if (!authenticationService.isAuthenticated()) {
    return createUrlTreeFromSnapshot(route, ['/auth']);
  }
  return true;
};

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  if (authenticationService.isAuthenticated()) {
    return createUrlTreeFromSnapshot(route, ['/']);
  }
  return true;
};
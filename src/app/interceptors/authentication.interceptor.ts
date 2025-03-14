import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  if (!authenticationService.isAuthenticated()) {
    return next(req);
  }
  req = req.clone({ headers: req.headers.set('Authorization', `Basic ${authenticationService.getToken()}`) });
  return next(req);
};

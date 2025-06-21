import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SecurityService } from '../../security/security.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const securityService: SecurityService = inject(SecurityService);

  if (securityService.getRoles().includes('admin')) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};

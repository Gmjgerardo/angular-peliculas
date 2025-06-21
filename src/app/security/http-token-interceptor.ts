import { inject } from "@angular/core";
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { SecurityService } from "./security.service";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const securityService: SecurityService = inject(SecurityService);
  const token: string | null = securityService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {'Authorization': `Bearer ${token}`}
    });
  }

  return next(req);
};
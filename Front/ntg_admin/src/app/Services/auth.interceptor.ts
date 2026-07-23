import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SuccessMessageService } from './success-message';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(SuccessMessageService);
  const token = localStorage.getItem('token');

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return handleErrors(next(authReq), messageService);
  }

  return handleErrors(next(req), messageService);
};

function handleErrors(request: ReturnType<HttpInterceptorFn>, messageService: SuccessMessageService) {
  return request.pipe(
    catchError((error) => {
      const serverMessage =
        typeof error.error === 'string' ? error.error : error.error?.message;
      const message =
        error.status === 0
          ? 'Unable to connect to the server. Please check your internet connection.'
          : error.status === 401
            ? serverMessage || 'Invalid email or password.'
            : serverMessage || 'Something went wrong. Please try again.';
      messageService.showError(message);
      return throwError(() => error);
    }),
  );
}

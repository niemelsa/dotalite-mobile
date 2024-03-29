import { HttpErrorInterceptor } from './http-error.interceptor';
import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];

import { AuthService } from '../services/auth.service';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.auth.tokenValue;
    const modified = this.addToken(request, token);

    return next.handle(modified);
  }

  private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let modified: HttpRequest<any>;
      modified = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return modified;
    }
    return request;
  }
}

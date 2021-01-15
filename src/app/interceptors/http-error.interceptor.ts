import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error instanceof ErrorEvent) {
          errorMsg = `Error: ${error}`;
        } else {
          errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}

import { ToastService } from '../services/toast.service';
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
  constructor(private toast: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        let errorMsg = '';
        if (error instanceof ErrorEvent) {
          errorMsg = `Error: ${error}`;
        } else {
          errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.toast.presentErrorToast(error);
        return throwError(errorMsg);
      })
    );
  }
}

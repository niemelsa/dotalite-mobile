import { StorageService } from './../services/storage.service';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private storage: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let promise = this.storage.get('id-token');

    // return of(promise).pipe(
    //   switchMap((token: any) => {
    //     console.log(token);
    //     let modified = this.addToken(request, token);
    //     return next.handle(modified);
    //   })
    // );

    let token = this.auth.token.value;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: any) {
    console.log('token: ', token);
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

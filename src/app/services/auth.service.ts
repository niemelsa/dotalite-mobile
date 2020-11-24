import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map, switchMap, tap } from 'rxjs/operators';

const { Storage } = Plugins;

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private jwtHelper: JwtHelperService
  ) {
    this.loadStoredToken().subscribe(() => {
      console.log(this.user.getValue());
    });
  }

  loadStoredToken(): Observable<any> {
    return from(this.platform.ready()).pipe(
      switchMap(() => from(Storage.get({ key: TOKEN_KEY }))),
      map(async (token) => {
        if (token && token.value) {
          const decodedToken = this.jwtHelper.decodeToken(token.value);

          if (this.jwtHelper.isTokenExpired(token.value)) {
            // handle expired token
            console.log('TOKEN EXPIRED');
            this.isAuthenticated.next(false);
            this.user.next(null);
            await Storage.remove({ key: TOKEN_KEY });
          } else {
            console.log('user already logged in');
            this.user.next(decodedToken);
            this.isAuthenticated.next(true);
          }
        } else {
          this.isAuthenticated.next(false);
          this.user.next(null);
          await Storage.remove({ key: TOKEN_KEY });
        }
      })
    );
  }

  verifyToken(token): Observable<any> {
    return this.http
      .get('http://localhost:3000/auth/verify', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        tap((data: any) => {
          this.isAuthenticated.next(true);
          this.user.next(data.user);
        }),
        switchMap((data: any) =>
          of(Storage.set({ key: TOKEN_KEY, value: data.token }))
        )
      );
  }

  testEndpoint() {
    return this.http.get('http://localhost:3000/auth/test').subscribe();
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    this.user.next(null);
    return Storage.remove({ key: TOKEN_KEY });
  }
}

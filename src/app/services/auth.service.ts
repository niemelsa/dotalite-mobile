import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

const { Storage } = Plugins;

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(null);
  public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  async fetchToken(): Promise<any> {
    return await Storage.get({ key: TOKEN_KEY });
  }

  verifyToken(token): void {
    this.http
      .get('http://localhost:3000/auth/verify', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        tap((data: any) => {
          this.isAuthenticated.next(true);
          this.user.next(data.user);
        }),
        switchMap((data: any) => {
          return of(Storage.set({ key: TOKEN_KEY, value: data.token }));
        })
      )
      .subscribe({
        next: () => console.log('login success'),
        error: (error) => {
          this.isAuthenticated.next(false);
          this.user.next(null);
          console.log('login failed');
        },
      })
      .add(() => {
        this.router.navigate(['/']);
      });
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    this.user.next(null);
    return Storage.remove({ key: TOKEN_KEY });
  }
}

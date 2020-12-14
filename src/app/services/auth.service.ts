import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from '../interfaces/user-info.interface';
import { mapToUserInfo } from '../utils/mapToUserInfo';
import { cfaSignIn, cfaSignOut } from 'capacitor-firebase-auth';
import { Router } from '@angular/router';
const { Storage } = Plugins;

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
  //   null
  // );
  // public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user: Observable<UserInfo>;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private jwtHelper: JwtHelperService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(mapToUserInfo);
  }

  logInWithGoogle() {
    cfaSignIn('google.com').subscribe(() => {
      this.router.navigate(['tabs']).then(() => {
        console.log('logged in');
      });
    });
  }

  logOut() {
    cfaSignOut().subscribe(() => {
      console.log('logged out');
    });
  }

  // loadStoredToken(): Observable<any> {
  //   return from(this.platform.ready()).pipe(
  //     switchMap(() => from(Storage.get({ key: TOKEN_KEY }))),
  //     map(async (token) => {
  //       if (token && token.value) {
  //         const decodedToken = this.jwtHelper.decodeToken(token.value);
  //
  //         if (this.jwtHelper.isTokenExpired(token.value)) {
  //           // handle expired token
  //           console.log('TOKEN EXPIRED');
  //           this.isAuthenticated.next(false);
  //           this.user.next(null);
  //           await Storage.remove({ key: TOKEN_KEY });
  //         } else {
  //           console.log('user already logged in');
  //           this.user.next(decodedToken);
  //           this.isAuthenticated.next(true);
  //         }
  //       } else {
  //         this.isAuthenticated.next(false);
  //         this.user.next(null);
  //         await Storage.remove({ key: TOKEN_KEY });
  //       }
  //     })
  //   );
  // }

  // verifyToken(token): Observable<any> {
  //   return this.http
  //     .get('https://dotalite.herokuapp.com/auth/verify', {
  //       headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
  //     })
  //     .pipe(
  //       tap((data: any) => {
  //         this.isAuthenticated.next(true);
  //         this.user.next(data.user);
  //       }),
  //       switchMap((data: any) =>
  //         of(Storage.set({ key: TOKEN_KEY, value: data.token }))
  //       )
  //     );
  // }

  // logout(): Promise<void> {
  //   this.isAuthenticated.next(false);
  //   this.user.next(null);
  //   return Storage.remove({ key: TOKEN_KEY });
  // }
}

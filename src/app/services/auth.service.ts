import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from '../interfaces/user-info.interface';
import { mapToUserInfo } from '../utils/mapToUserInfo';
import { cfaSignIn } from 'capacitor-firebase-auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  async logInWithGoogle() {
    cfaSignIn('google.com').subscribe(() => {
      this.router.navigate(['tabs']).then(() => {
        console.log('logged in with google');
      });
    });
  }

  async logInWithFacebook() {
    cfaSignIn('facebook.com').subscribe(() => {
      this.router.navigate(['tabs']).then(() => {
        console.log('logged in with facebook');
      });
    });
  }

  async logInWithTwitter() {
    cfaSignIn('twitter.com').subscribe(() => {
      this.router.navigate(['tabs']).then(() => {
        console.log('logged in with twitter');
      });
    });
  }

  logOut() {
    // cfaSignOut().subscribe(() => {
    //   console.log('logged out');
    // });
    this.afAuth.signOut().then(() => {
      console.log('signed out');
    });
  }
}

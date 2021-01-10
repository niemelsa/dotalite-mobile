import { UserInfo } from './../interfaces/user-info.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { cfaSignIn } from 'capacitor-firebase-auth';
import { Router } from '@angular/router';
import { filter, mergeMap, switchMap, tap } from 'rxjs/operators';

// TODO: find better way
import firebase from 'firebase';
import User = firebase.User;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: BehaviorSubject<UserInfo> = new BehaviorSubject(null);
  apiUrl = 'http://localhost:3000/auth/';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
    this.afAuth.authState
      .pipe(
        // prevents http call to server incase user logs out
        tap((user) => !user && this.user.next(null)),
        filter<User>(Boolean),
        mergeMap((user) => user.getIdToken()),
        switchMap((token) => this.getUserInfo(token))
      )
      .subscribe((user) => this.user.next(user));
  }

  getUserInfo(token: string): Observable<UserInfo> {
    const request = `${this.apiUrl}`;

    return this.http.get<UserInfo>(request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

  async logOut() {
    // cfaSignOut().subscribe(() => {
    //   console.log('logged out');
    // });
    this.afAuth.signOut().then(() => {
      console.log('signed out');
    });
  }
}

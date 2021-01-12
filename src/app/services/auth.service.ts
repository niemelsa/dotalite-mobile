import { StorageService } from './storage.service';
import { UserInfo } from './../interfaces/user-info.interface';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { cfaSignIn } from 'capacitor-firebase-auth';
import { Router } from '@angular/router';
import { filter, mergeMap, switchMap, tap } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

// TODO: find better way
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: BehaviorSubject<UserInfo> = new BehaviorSubject(null);
  public token: BehaviorSubject<any> = new BehaviorSubject(null);
  apiUrl = 'http://localhost:3000/auth/signin';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
    this.afAuth.authState
      .pipe(
        // prevents http call to server incase user logs out
        tap((user) => !user && this.logOutUser()),
        filter<firebase.User>(Boolean),
        mergeMap((user) => user.getIdToken()),
        tap((token) => this.token.next(token)),
        switchMap(() => this.getUserInfo())
      )
      .subscribe((user) => this.logInUser(user));
  }

  getUserInfo(): Observable<UserInfo> {
    const request = `${this.apiUrl}`;

    return this.http.get<UserInfo>(request);
  }

  async logOutUser() {
    await Storage.remove({ key: 'idToken' });
    this.user.next(null);
  }

  async logInUser(user: UserInfo) {
    await Storage.set({ key: 'idToken', value: user.uid });
    this.user.next(user);
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

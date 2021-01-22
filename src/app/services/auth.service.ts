import { UserInfo } from './../interfaces/user-info.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { cfaSignIn } from 'capacitor-firebase-auth';
import { Router } from '@angular/router';
import { filter, mergeMap, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// TODO: find better way
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: BehaviorSubject<UserInfo> = new BehaviorSubject(null);
  public token: BehaviorSubject<string> = new BehaviorSubject(null);
  private apiUrl: string = environment.apiUrl;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
    this.afAuth.authState
      .pipe(
        // tap and filter prevent http call to server incase user logs out
        tap((user) => !user && this.logOutUser()),
        filter<firebase.User>(Boolean),
        mergeMap((user) => user.getIdToken(true)),
        tap((token) => this.token.next(token)),
        switchMap(() => this.getUserInfo())
      )
      .subscribe((user) => this.logInUser(user));
  }

  private getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}/auth/signin`);
  }

  public async logOutUser() {
    this.afAuth.signOut().then(() => {
      this.token.next(null);
      this.user.next(null);
    });
  }

  public async logInUser(user: UserInfo) {
    this.user.next(user);
    await this.router.navigate(['tabs']);

    console.log(user);
  }

  async logInWithGoogle() {
    cfaSignIn('google.com').subscribe();
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
}

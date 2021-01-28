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
  private userSource: BehaviorSubject<UserInfo> = new BehaviorSubject(null);
  private tokenSource: BehaviorSubject<string> = new BehaviorSubject(null);

  public user$: Observable<UserInfo> = this.userSource.asObservable();
  public token$: Observable<string> = this.tokenSource.asObservable();

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
        tap((token) => this.updateTokenValue(token)),
        switchMap(() => this.getUserInfo())
      )
      .subscribe((user) => this.logInUser(user));
  }

  get tokenValue() {
    return this.tokenSource.getValue();
  }

  private getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}/auth/signin`);
  }

  public updateTokenValue(token: string): void {
    this.tokenSource.next(token);
  }

  public updateUserValue(user: UserInfo): void {
    this.userSource.next(user);
  }

  public async logOutUser() {
    this.afAuth.signOut().then(() => {
      this.updateTokenValue(null);
      this.updateUserValue(null);
    });
  }

  private async logInUser(user: UserInfo) {
    this.updateUserValue(user);
    await this.router.navigate(['tabs']);
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

  async signUpWithEmail(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('signed up successfully');
        console.log(res);
      })
      .catch((error) => {
        console.log('something went wrong');
      });
  }

  async logInWithEmail(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('logged in successfully');
        console.log(res);
      })
      .catch((error) => {
        console.log('something went wrong');
      });
  }
}

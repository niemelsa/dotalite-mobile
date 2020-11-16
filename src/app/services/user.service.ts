import { User } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public user = this.userSubject.asObservable().pipe(distinctUntilChanged());

  constructor() { }

  login(user) {
    this.userSubject.next(user);
  }

  logout() {
    this.userSubject.next(null);
  }
}

import { UserInfo } from './../interfaces/user-info.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://dotalite.herokuapp.com';
  // apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  linkProfile(playerId: number): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${this.apiUrl}/user/link`, { playerId });
  }
}

import { UserInfo } from './../interfaces/user-info.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  linkProfile(playerId: number): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${this.apiUrl}/user/link`, { playerId });
  }
}

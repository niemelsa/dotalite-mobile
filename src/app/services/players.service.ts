import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  apiUrl = 'https://dotalite.herokuapp.com';
  // apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPlayerData(playerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/players/${playerId}`);
  }

  linkProfile(playerId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/link`, { playerId });
  }
}

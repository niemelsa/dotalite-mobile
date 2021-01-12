import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  apiUrl = 'http://localhost:3000/user/link';

  constructor(private http: HttpClient) {}

  getPlayerData(playerId: string): Observable<any> {
    return this.http.get(`https://dotalite.herokuapp.com/players/${playerId}`);
  }

  linkProfile(playerId: number): Observable<any> {
    return this.http.put(this.apiUrl, { playerId });
  }
}

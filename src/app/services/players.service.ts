import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPlayerData(playerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/players/${playerId}`);
  }
}

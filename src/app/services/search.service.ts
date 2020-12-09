import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchResults: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  players: Array<any>;
  teams: Array<any>;
  apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  async getSearchResults(query: string) {
    const request = `${this.apiUrl}search/?query=${query}`;

    return this.http
      .get(request)
      .pipe(
        map(({ results }: any) => results),
        tap((results) => {
          this.players = results.players.filter((player, index) => index < 5);
          this.teams = results.teams.filter((team, index) => index < 5);
          this.searchResults.next(results);
        })
      )
      .subscribe();
  }
}

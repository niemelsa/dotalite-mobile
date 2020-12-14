import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchResponse } from '../interfaces/search-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  apiUrl = 'https://dotalite.herokuapp.com/';
  searchResults: BehaviorSubject<SearchResponse> = new BehaviorSubject<SearchResponse>(
    null
  );

  constructor(private http: HttpClient) {}

  async getSearchResults(query: string) {
    const request = `${this.apiUrl}search/?query=${query}`;

    return this.http
      .get(request)
      .pipe(
        map(({ players, teams, matches, leagues, proPlayers }: any) => ({
          players,
          teams,
          matches,
          tournaments: leagues,
          proPlayers,
        }))
      )
      .subscribe((results: SearchResponse) => this.searchResults.next(results));
  }
}

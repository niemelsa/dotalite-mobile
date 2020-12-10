import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SearchResponse } from '../interfaces/search-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  apiUrl = 'http://localhost:3000/';
  searchResults: BehaviorSubject<SearchResponse> = new BehaviorSubject<SearchResponse>(
    null
  );
  filteredResults: SearchResponse = {} as any;

  constructor(private http: HttpClient) {}

  async getSearchResults(query: string) {
    const request = `${this.apiUrl}search/?query=${query}`;

    return this.http
      .get(request)
      .pipe(
        tap((results: SearchResponse) => {
          for (const [key, value] of Object.entries(results)) {
            if (value instanceof Array) {
              this.filteredResults[key] = value.filter(
                (el, index) => index < 5
              );
            } else {
              this.filteredResults[key] = value;
            }
          }

          this.searchResults.next(results);
        })
      )
      .subscribe();
  }
}

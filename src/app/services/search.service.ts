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

  constructor(private http: HttpClient) {}

  async getSearchResults(query: string) {
    const request = `${this.apiUrl}search/?query=${query}`;

    return this.http
      .get(request)
      .subscribe((results: SearchResponse) => this.searchResults.next(results));
  }
}

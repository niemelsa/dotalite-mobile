import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchResponse } from '../interfaces/search-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  apiUrl = 'https://dotalite.herokuapp.com';
  // apiUrl = 'http://localhost:3000';
  searchResults: BehaviorSubject<SearchResponse> = new BehaviorSubject<SearchResponse>(
    null
  );

  constructor(private http: HttpClient) {}

  getSearchResults(query: string): Observable<SearchResponse> {
    const request = `${this.apiUrl}/search/?query=${query}`;

    return this.http.get<SearchResponse>(request);
  }
}

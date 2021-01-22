import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResponse } from '../interfaces/search-response.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchResults: BehaviorSubject<SearchResponse> = new BehaviorSubject<SearchResponse>(
    null
  );
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSearchResults(query: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(
      `${this.apiUrl}/search/?query=${query}`
    );
  }
}

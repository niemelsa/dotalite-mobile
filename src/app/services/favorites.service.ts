import { UserInfo } from './../interfaces/user-info.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  // apiUrl = 'https://dotalite.herokuapp.com';
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addToFavorites(favorite) {
    return this.http.post<UserInfo>(`${this.apiUrl}/user/favorite`, favorite);
  }

  removeFromFavorites({ favoriteId }) {
    return this.http.delete<UserInfo>(
      `${this.apiUrl}/user/favorite/${favoriteId}`
    );
  }
}

import { UserInfo } from './../interfaces/user-info.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl: string = environment.apiUrl;

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

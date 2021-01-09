import { Favorite } from './favorite.interface';

export interface UserInfo {
  name: string;
  email: string;
  image: string;
  uid: string;
  playerId?: string;
  favorites?: Favorite[];
}

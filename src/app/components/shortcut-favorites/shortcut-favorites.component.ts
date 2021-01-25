import { Router } from '@angular/router';
import { Favorite } from './../../interfaces/favorite.interface';
import { UserInfo } from './../../interfaces/user-info.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shortcut-favorites',
  templateUrl: './shortcut-favorites.component.html',
  styleUrls: ['./shortcut-favorites.component.scss'],
})
export class ShortcutFavoritesComponent implements OnInit {
  @Input() user: UserInfo;

  constructor(private router: Router) {}

  ngOnInit() {}

  async openFavorite(favorite: Favorite) {
    const type = favorite.type.toLowerCase();

    switch (type) {
      case 'player':
        this.router.navigate(['/tabs/players', favorite.favoriteId]);
        break;
      case 'team':
        console.log('tiimi');
        break;
      case 'tournament':
        console.log('turnaus');
        break;
    }
  }
}

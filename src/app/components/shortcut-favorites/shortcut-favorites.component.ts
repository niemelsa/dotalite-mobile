import { PlayersProfilePage } from 'src/app/pages/players-profile/players-profile.page';
import { ModalController } from '@ionic/angular';
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

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async openFavorite(favorite: Favorite) {
    const type = favorite.type.toLowerCase();

    switch (type) {
      case 'player':
        this.openProfile(favorite.favoriteId);
        break;
      case 'team':
        console.log('tiimi');
        break;
      case 'tournament':
        console.log('turnaus');
        break;
    }
  }

  async openProfile(playerId: number | string): Promise<void> {
    const modal = await this.modalController.create({
      component: PlayersProfilePage,
      componentProps: {
        playerId,
      },
      cssClass: 'player-modal',
    });

    await modal.present();
  }
}

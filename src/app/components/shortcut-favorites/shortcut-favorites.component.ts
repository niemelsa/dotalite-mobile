import { ModalController } from '@ionic/angular';
import { Favorite } from './../../interfaces/favorite.interface';
import { UserInfo } from './../../interfaces/user-info.interface';
import { Component, Input, OnInit } from '@angular/core';
import { ProfilePage } from 'src/app/pages/profile/profile.page';

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
        this.openProfile(Number(favorite.favoriteId));
        break;
      case 'team':
        console.log('tiimi');
        break;
      case 'tournament':
        console.log('turnaus');
        break;
    }
  }

  async openProfile(id: number) {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: {
        playerId: id,
      },
      cssClass: 'player-modal',
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
  }
}

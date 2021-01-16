import { Favorite } from './../../interfaces/favorite.interface';
import { UserInfo } from './../../interfaces/user-info.interface';
import { Component, Input, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { ProfilePage } from 'src/app/pages/profile/profile.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
})
export class ShortcutComponent implements OnInit {
  @Input() user: UserInfo;
  selectedTab = 'featured';

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  segmentChanged({ detail }: CustomEvent) {
    console.log(detail.value);
  }

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
        userId: id,
      },
      cssClass: 'player-modal',
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
  }
}

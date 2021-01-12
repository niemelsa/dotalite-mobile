import { User } from '../../interfaces/user.interface';
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
  @Input() user: User;

  mockFavorites = [
    {
      title: 'soupy',
      category: 'Player',
      image:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/69/6926d43e27abb3d730544f008aa3f8dad36be0da_full.jpg',
      id: 59544008,
    },
    {
      title: 'spicy',
      category: 'Player',
      image:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/56/56e36ec470740cf8548996697e5cddb624af3508_full.jpg',
      id: 56877930,
    },
    {
      title: 'OG',
      category: 'Team',
      image: 'https://riki.dotabuff.com/t/l/11jt47R2Yjx.png',
    },
  ];

  selectedTab = 'featured';

  constructor(
    private playersService: PlayersService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  segmentChanged({ detail }: CustomEvent) {
    console.log(detail.value);
  }

  async openFavorite(favorite) {
    const type = favorite.category.toLowerCase();

    switch (type) {
      case 'player':
        this.openProfile(favorite.id);
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

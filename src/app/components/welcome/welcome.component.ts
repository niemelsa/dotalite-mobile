import { PlayerData } from './../../interfaces/player-data.interface';
import { SearchComponent } from './../search/search.component';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PlayersService } from '../../services/players.service';
import { UserInfo } from '../../interfaces/user-info.interface';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from 'src/app/pages/profile/profile.page';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnChanges {
  @Input() user: UserInfo;
  player: PlayerData = null;

  constructor(
    public playersService: PlayersService,
    public authService: AuthService,
    public modalController: ModalController
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user.currentValue) {
      let playerId = changes.user.currentValue.playerId;
      if (playerId != null && !this.player) {
        this.getPlayerData(playerId);
      }
    }
  }

  async openSearch() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'search-modal',
      componentProps: {
        isLinkComponent: true,
      },
    });

    return await modal.present();
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

  getPlayerData(playerId: string) {
    this.playersService
      .getPlayerData(playerId)
      .subscribe((player: PlayerData) => {
        this.player = player;
        console.log(this.player);
      });
  }
}

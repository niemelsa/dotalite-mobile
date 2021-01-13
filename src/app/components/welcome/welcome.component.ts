import { PlayerData } from './../../interfaces/player-data.interface';
import { SearchComponent } from './../search/search.component';
import { Component, Input } from '@angular/core';
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
export class WelcomeComponent {
  private _user: UserInfo;
  public player: PlayerData = null;

  @Input()
  set user(val: UserInfo) {
    if (val && val.playerId) {
      if (!this.player) {
        this.getPlayerData(val.playerId);
      } else {
        if (this.player.profile.account_id != val.playerId) {
          this.getPlayerData(val.playerId);
        }
      }
    } else {
      this.player = null;
    }
  }

  get user(): UserInfo {
    return this._user;
  }

  constructor(
    public playersService: PlayersService,
    public authService: AuthService,
    public modalController: ModalController
  ) {}

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
    if (playerId) {
      this.playersService
        .getPlayerData(playerId)
        .subscribe((player: PlayerData) => {
          this.player = player;
        });
    }
  }
}

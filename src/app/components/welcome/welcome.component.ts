import { SearchComponent } from './../search/search.component';
import { PlayersProfilePage } from 'src/app/pages/players-profile/players-profile.page';
import { PlayerData } from './../../interfaces/player-data.interface';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PlayersService } from '../../services/players.service';
import { UserInfo } from '../../interfaces/user-info.interface';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  @Input() user: UserInfo;
  @Input() player: PlayerData;
  @Input() isLinked: boolean;

  constructor(
    public playersService: PlayersService,
    public authService: AuthService,
    public modalController: ModalController
  ) {}

  async linkPlayerProfile(): Promise<void> {
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'search-modal',
      componentProps: {
        isLinkComponent: true,
      },
    });

    await modal.present();
  }

  async openProfile(playerId: number): Promise<void> {
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

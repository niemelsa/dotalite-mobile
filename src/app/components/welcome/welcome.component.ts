import { PresentationService } from './../../services/presentation.service';
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

  constructor(
    public playersService: PlayersService,
    public authService: AuthService,
    public modalController: ModalController,
    private present: PresentationService
  ) {}

  async initiateLinkingPlayer(): Promise<void> {
    await this.present.presentLinkSearchModal();
  }

  async openProfile(): Promise<void> {
    console.log('opening profile: ', this.user.playerId);
    await this.present.presentProfileModal(this.user.playerId);
  }
}

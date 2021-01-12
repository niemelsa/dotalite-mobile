import { PlayersService } from './../../services/players.service';
import { PlayerData } from '../../interfaces/player-data.interface';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {
  player: PlayerData;
  selectedTab = 'Overview';

  constructor(
    private modalCtrl: ModalController,
    private playersService: PlayersService
  ) {}

  @Input() userId: any;

  ngOnInit() {
    this.getPlayerData();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  getPlayerData() {
    this.playersService
      .getPlayerData(this.userId)
      .subscribe((player: PlayerData) => {
        this.player = player;
      });
  }

  handleTabChanged(newTab: string) {
    this.selectedTab = newTab;
  }
}

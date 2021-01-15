import { Observable } from 'rxjs';
import { FavoritesService } from './../../services/favorites.service';
import { AuthService } from './../../services/auth.service';
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
  @Input() userId: any;

  constructor(
    private modalCtrl: ModalController,
    private playersService: PlayersService,
    public auth: AuthService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.getPlayerData();
  }

  isFavorited(): boolean {
    let favorites = this.auth.user.getValue().favorites;

    if (
      favorites &&
      favorites.some((e) =>
        e.favoriteId.includes(this.player.profile.account_id)
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  toggleFavorite(player: PlayerData) {
    let {
      profile: { personaname: title, avatarfull: image, account_id: playerId },
    } = player;
    let userId = this.auth.user.getValue().uid;

    let favorite = {
      title,
      image,
      playerId,
      userId,
    };

    let request: Observable<any> = this.isFavorited()
      ? this.favoritesService.removeFromFavorites(favorite)
      : this.favoritesService.addToFavorites(favorite);

    request.subscribe((user) => {
      console.log('toggled favorite: ', user);
    });
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

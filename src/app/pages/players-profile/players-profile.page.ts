import { ModalController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { UserInfo } from '../../interfaces/user-info.interface';
import { Observable } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';
import { PlayersService } from '../../services/players.service';
import { PlayerData } from '../../interfaces/player-data.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-players-profile-page',
  templateUrl: './players-profile.page.html',
  styleUrls: ['./players-profile.page.scss'],
})
export class PlayersProfilePage implements OnInit {
  public player$: Observable<PlayerData>;
  public user$: Observable<UserInfo>;
  public selectedTab = 'Overview';

  @Input() playerId: number;

  constructor(
    private playersService: PlayersService,
    public auth: AuthService,
    private favoritesService: FavoritesService,
    private toast: ToastService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.player$ = this.playersService.getPlayerData(this.playerId);
    this.user$ = this.auth.user$;
  }

  handleFavoriteToggled({ player, isFavorited }: any) {
    const {
      profile: { personaname: title, avatarfull: image, account_id: playerId },
    } = player;

    const favorite = {
      title,
      image,
      favoriteId: playerId,
      type: 'Player',
    };

    const request: Observable<any> = isFavorited
      ? this.favoritesService.removeFromFavorites(favorite)
      : this.favoritesService.addToFavorites(favorite);

    request.subscribe(({ user }) => {
      if (user) {
        this.auth.updateUserValue(user);
        this.toast.presentFavoritesToast({ title, isFavorited });
      }
    });
  }

  handleNavigateBack() {
    this.modalController.dismiss();
  }

  handleTabChanged(newTab: string) {
    this.selectedTab = newTab;
  }
}

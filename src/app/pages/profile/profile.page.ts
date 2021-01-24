import { ToastService } from './../../services/toast.service';
import { Observable, of } from 'rxjs';
import { FavoritesService } from './../../services/favorites.service';
import { AuthService } from './../../services/auth.service';
import { PlayersService } from './../../services/players.service';
import { PlayerData } from '../../interfaces/player-data.interface';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {
  public player$: Observable<PlayerData>;
  public isFavorited: boolean;
  public selectedTab = 'Overview';
  @Input() playerId: any;

  constructor(
    private modalCtrl: ModalController,
    private playersService: PlayersService,
    public auth: AuthService,
    private favoritesService: FavoritesService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.player$ = this.playersService
      .getPlayerData(this.playerId)
      .pipe(tap(() => this.setIsFavorited()));
  }

  private setIsFavorited(): void {
    const playerId = this.playerId;
    const favorites = this.auth.user.getValue().favorites;

    this.isFavorited =
      favorites &&
      playerId &&
      favorites.some((e) => e.favoriteId.includes(playerId));
  }

  public toggleFavorite(player: PlayerData) {
    const {
      profile: { personaname: title, avatarfull: image, account_id: playerId },
    } = player;

    const favorite = {
      title,
      image,
      favoriteId: playerId,
      type: 'Player',
    };

    const request: Observable<any> = this.isFavorited
      ? this.favoritesService.removeFromFavorites(favorite)
      : this.favoritesService.addToFavorites(favorite);

    request
      .pipe(
        catchError((error) => {
          return of(null, error);
        })
      )
      .subscribe(({ user, error }) => {
        if (user) {
          this.auth.user.next(user);
          this.toast.presentFavoritesToast({ title, status: this.isFavorited });
        } else {
          this.toast.presentErrorToast(error);
        }

        this.setIsFavorited();
      });

    this.isFavorited = !this.isFavorited;
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  handleTabChanged(newTab: string) {
    this.selectedTab = newTab;
  }
}

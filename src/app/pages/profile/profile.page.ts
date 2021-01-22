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
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.player$ = this.playersService
      .getPlayerData(this.playerId)
      .pipe(tap(() => this.setIsFavorited()));
  }

  private setIsFavorited(): void {
    let playerId = this.playerId;
    let favorites = this.auth.user.getValue().favorites;

    this.isFavorited =
      favorites &&
      playerId &&
      favorites.some((e) => e.favoriteId.includes(playerId));
  }

  public toggleFavorite(player: PlayerData) {
    let {
      profile: { personaname: title, avatarfull: image, account_id: playerId },
    } = player;

    let favorite = {
      title,
      image,
      favoriteId: playerId,
      type: 'Player',
    };

    let request: Observable<any> = this.isFavorited
      ? this.favoritesService.removeFromFavorites(favorite)
      : this.favoritesService.addToFavorites(favorite);

    request
      .pipe(
        catchError(() => {
          return of(null);
        })
      )
      .subscribe(({ user }) => {
        if (user) {
          this.auth.user.next(user);
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

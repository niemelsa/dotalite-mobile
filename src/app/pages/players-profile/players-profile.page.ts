import { ActivatedRoute } from '@angular/router';
import { PresentationService } from '../../services/presentation.service';
import { UserInfo } from '../../interfaces/user-info.interface';
import { Observable, of } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';
import { PlayersService } from '../../services/players.service';
import { PlayerData } from '../../interfaces/player-data.interface';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { catchError, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

export enum FavoritesActionType {
  Remove = 'remove',
  Add = 'add',
}

@Component({
  selector: 'app-players-profile-page',
  templateUrl: './players-profile.page.html',
  styleUrls: ['./players-profile.page.scss'],
})
export class PlayersProfilePage implements OnInit {
  public player$: Observable<PlayerData>;
  public user$: Observable<UserInfo>;
  public playerId$: Observable<any>;
  public selectedTab = 'Overview';
  public isFavorited: boolean;

  constructor(
    private playersService: PlayersService,
    public auth: AuthService,
    private favoritesService: FavoritesService,
    private toast: PresentationService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.player$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return this.playersService.getPlayerData(id);
      })
    );
    this.user$ = this.auth.user$;
    this.isFavorited = false;
  }

  // private setIsFavorited(): void {
  // const playerId = this.playerId;
  // const favorites = this.auth.user$;
  // this.isFavorited =
  //   favorites &&
  //   playerId &&
  //   favorites.some((e) => e.favoriteId.includes(playerId));
  // }

  // public toggleFavorite(player: PlayerData) {
  //   const {
  //     profile: { personaname: title, avatarfull: image, account_id: playerId },
  //   } = player;

  //   const favorite = {
  //     title,
  //     image,
  //     favoriteId: playerId,
  //     type: 'Player',
  //   };

  //   const request: Observable<any> = this.isFavorited
  //     ? this.favoritesService.removeFromFavorites(favorite)
  //     : this.favoritesService.addToFavorites(favorite);

  //   request
  //     .pipe(
  //       catchError((error) => {
  //         return of(null, error);
  //       })
  //     )
  //     .subscribe(({ user, error }) => {
  //       if (user) {
  //         this.auth.updateUserValue(user);
  //         this.toast.presentFavoritesToast({ title, status: this.isFavorited });
  //       } else {
  //         this.toast.presentErrorToast(error);
  //       }

  //       this.setIsFavorited();
  //     });

  //   this.isFavorited = !this.isFavorited;
  // }

  handleFavoriteToggled({ player, action }: any) {
    const {
      profile: { personaname: title, avatarfull: image, account_id: playerId },
    } = player;

    const favorite = {
      title,
      image,
      favoriteId: playerId,
      type: 'Player',
    };

    const request: Observable<any> =
      action === FavoritesActionType.Remove
        ? this.favoritesService.removeFromFavorites(favorite)
        : this.favoritesService.addToFavorites(favorite);

    request
      .pipe(
        catchError(() => {
          return of(null);
        })
      )
      .subscribe((user) => {
        if (user) {
          this.auth.updateUserValue(user);
          this.toast.presentFavoritesToast({ title, action });
        }
      });

    // switch (type) {
    //   case FavoritesActionType.Remove: {
    //     this.favoritesService
    //       .removeFromFavorites(favorite)
    //       .subscribe((user) => {
    //         if (user) {
    //           this.auth.updateUserValue(user);
    //           this.toast.presentFavoritesToast({ title, type });
    //         }
    //       });
    //     break;
    //   }
    //   case FavoritesActionType.Add: {
    //     this.favoritesService.addToFavorites(favorite).subscribe((user) => {
    //       if (user) {
    //         this.auth.updateUserValue(user);
    //         this.toast.presentFavoritesToast({ title, type });
    //       }
    //     });
    //     break;
    //   }
    // }
  }

  handleNavigateBack() {
    this.location.back();
  }

  handleTabChanged(newTab: string) {
    this.selectedTab = newTab;
  }
}

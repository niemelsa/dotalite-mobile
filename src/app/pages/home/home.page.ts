import { PresentationService } from './../../services/presentation.service';
import { switchMap } from 'rxjs/operators';
import { PlayersService } from './../../services/players.service';
import { PlayerData } from './../../interfaces/player-data.interface';
import { Observable, of } from 'rxjs';
import { UserInfo } from './../../interfaces/user-info.interface';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public user$: Observable<UserInfo>;
  public userPlayerData$: Observable<PlayerData | null>;
  public isLinked: boolean;

  constructor(
    public auth: AuthService,
    private playersService: PlayersService,
    private presentation: PresentationService
  ) {}

  ngOnInit() {
    this.user$ = this.auth.user$;
    this.userPlayerData$ = this.auth.user$.pipe(
      switchMap((user) => {
        if (user && user.playerId) {
          this.isLinked = true;
          return this.playersService.getPlayerData(user.playerId);
        } else {
          this.isLinked = false;
          return of(null);
        }
      })
    );
  }

  async toggleSearch() {
    await this.presentation.presentSearchModal();
  }

  async toggleNotifications(event: any) {
    // await this.presentation.presentNotificationsPopover(event);
    console.log('notifications clicked');
  }
}

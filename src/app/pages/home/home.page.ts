import { SearchComponent } from './../../components/search/search.component';
import { ModalController } from '@ionic/angular';
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
    private modalController: ModalController
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
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'search-modal',
      componentProps: {
        isLinkComponent: false,
      },
    });

    await modal.present();
  }

  async toggleNotifications(event: any) {
    console.log('notifications clicked');
  }
}

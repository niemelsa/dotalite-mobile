import { switchMap, filter } from 'rxjs/operators';
import { PlayersService } from './../../services/players.service';
import { PlayerData } from './../../interfaces/player-data.interface';
import { Observable, of } from 'rxjs';
import { UserInfo } from './../../interfaces/user-info.interface';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { SearchComponent } from '../../components/search/search.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public user$: Observable<UserInfo>;
  public userPlayerData$: Observable<PlayerData>;

  constructor(
    public auth: AuthService,
    private modalController: ModalController,
    private popoverCtrl: PopoverController,
    private playersService: PlayersService
  ) {}

  ngOnInit() {
    this.user$ = this.auth.user$;
    this.userPlayerData$ = this.auth.user$.pipe(
      filter<UserInfo>(Boolean),
      switchMap((user) => {
        if (user.playerId) {
          return this.playersService.getPlayerData(user.playerId);
        }
      })
    );
  }

  async toggleSearch() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'search-modal',
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
  }

  async toggleNotifications(event: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event,
      mode: 'ios',
      cssClass: 'notifications-popover',
    });

    return await popover.present();
  }
}

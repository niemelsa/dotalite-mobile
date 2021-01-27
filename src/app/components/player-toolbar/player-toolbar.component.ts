import { PlayerData } from './../../interfaces/player-data.interface';
import { UserInfo } from './../../interfaces/user-info.interface';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-player-toolbar',
  templateUrl: './player-toolbar.component.html',
  styleUrls: ['./player-toolbar.component.scss'],
})
export class PlayerToolbarComponent implements OnInit, OnChanges {
  @Input() user: UserInfo;
  @Input() player: PlayerData;

  @Output() backButtonClicked = new EventEmitter();
  @Output() favoriteToggledEvent = new EventEmitter();

  public isOwnProfile: boolean;
  public isFavorited: boolean;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    let { player, user }: any = changes;

    if (!player || !user) {
      return;
    }

    player = player.currentValue as PlayerData;
    user = user.currentValue as UserInfo;

    if (player && user) {
      this.isFavorited = this.checkIsFavorited(player, user);
      this.isOwnProfile = this.checkIsOwnProfile(player, user);
    }
  }

  private checkIsOwnProfile(player: PlayerData, user: UserInfo): boolean {
    return player.profile.account_id === Number(user.playerId);
  }

  private checkIsFavorited(player: PlayerData, user: UserInfo): boolean {
    const { favorites } = user;
    const playerId = player.profile.account_id.toString();
    console.log(favorites, playerId);
    console.log(favorites.some((e) => e.favoriteId.includes(playerId)));

    return (
      playerId &&
      favorites &&
      favorites.some((e) => e.favoriteId.includes(playerId))
    );
  }

  navigateBack() {
    this.backButtonClicked.emit();
  }

  toggleFavorite() {
    this.favoriteToggledEvent.emit({
      player: this.player,
      isFavorited: this.isFavorited,
    });
    this.isFavorited = !this.isFavorited;
  }
}

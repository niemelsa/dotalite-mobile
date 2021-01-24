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
import { FavoritesActionType } from 'src/app/pages/profile/profile.page';

@Component({
  selector: 'app-player-toolbar',
  templateUrl: './player-toolbar.component.html',
  styleUrls: ['./player-toolbar.component.scss'],
})
export class PlayerToolbarComponent implements OnInit, OnChanges {
  public isFavorited: boolean;

  @Input() user: UserInfo;
  @Input() player: PlayerData;

  @Output() dismissClickedEvent = new EventEmitter();
  @Output() favoriteToggledEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const { player, user } = changes;

    if (player && user) {
      if (player.currentValue && user.currentValue) {
        this.setIsFavorited(player.currentValue, user.currentValue);
      }
    }
  }

  private setIsFavorited(player: PlayerData, user: UserInfo): void {
    const { favorites } = user;
    const playerId = player.profile.account_id;
    console.log(favorites, playerId);
    console.log(favorites.some((e) => e.favoriteId.includes(playerId)));

    this.isFavorited =
      playerId &&
      favorites &&
      favorites.some((e) => e.favoriteId.includes(playerId));
  }

  dismiss() {
    this.dismissClickedEvent.emit();
  }

  toggleFavorite() {
    const type = this.isFavorited
      ? FavoritesActionType.Remove
      : FavoritesActionType.Add;
    this.favoriteToggledEvent.emit({ player: this.player, type });
    this.isFavorited = !this.isFavorited;
  }
}

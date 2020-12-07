import { BehaviorSubject } from 'rxjs';
import { PlayerData } from '../../interfaces/player-data.interface';
import { Component, Input, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  private playerSubject = new BehaviorSubject<PlayerData>(null);
  playerData: PlayerData;
  selected = 'Overview';

  @Input()
  set data(value) {
    this.playerSubject.next(value);
  }

  constructor() {}

  ngOnInit() {
    this.playerSubject
      .pipe(takeWhile(() => !this.playerData))
      .subscribe((player) => {
        this.playerData = player;
      });
  }

  changeTab(newTab: string) {
    this.selected = newTab;
  }
}

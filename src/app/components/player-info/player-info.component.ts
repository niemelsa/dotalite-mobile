import { PlayerData } from '../../interfaces/player-data.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
})
export class PlayerInfoComponent implements OnInit {
  @Input() player: PlayerData;
  @Input() currentTab: string;

  constructor() {}

  ngOnInit() {}

  calculateWinrate(wins, losses): string {
    return ((wins / (wins + losses)) * 100).toPrecision(4);
  }
}

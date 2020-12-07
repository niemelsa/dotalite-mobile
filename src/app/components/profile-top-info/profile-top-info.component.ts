import { PlayerData } from '../../interfaces/player-data.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-top-info',
  templateUrl: './profile-top-info.component.html',
  styleUrls: ['./profile-top-info.component.scss'],
})
export class ProfileTopInfoComponent implements OnInit {
  @Input() player: PlayerData;
  @Input() selected: string;

  constructor() {}

  ngOnInit() {}

  calculateWinrate(wins, losses): string {
    return ((wins / (wins + losses)) * 100).toPrecision(4);
  }
}

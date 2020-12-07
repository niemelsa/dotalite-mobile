import { Component, Input, OnInit } from '@angular/core';
import { PlayerData } from '../../interfaces/player-data.interface';

@Component({
  selector: 'app-player-matches',
  templateUrl: './player-matches.component.html',
  styleUrls: ['./player-matches.component.scss'],
})
export class PlayerMatchesComponent implements OnInit {
  @Input() player: PlayerData;

  constructor() {}

  ngOnInit() {}
}

import { Component, Input, OnInit } from '@angular/core';
import { PlayerData } from '../../interfaces/player-data.interface';

@Component({
  selector: 'app-player-heroes',
  templateUrl: './player-heroes.component.html',
  styleUrls: ['./player-heroes.component.scss'],
})
export class PlayerHeroesComponent implements OnInit {
  @Input() player: PlayerData;

  constructor() {}

  ngOnInit() {}
}

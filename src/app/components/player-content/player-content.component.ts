import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerData } from '../../interfaces/player-data.interface';

@Component({
  selector: 'app-player-content',
  templateUrl: './player-content.component.html',
  styleUrls: ['./player-content.component.scss'],
})
export class PlayerContentComponent implements OnInit {
  @Input() selected: string;
  @Input() player: PlayerData;

  constructor() {}

  ngOnInit() {}
}

import { PlayerData } from '../../interfaces/player-data.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
})
export class PlayerInfoComponent {
  @Input() player: PlayerData;
  @Input() selected: string;

  @Output() changeTab = new EventEmitter<string>();

  constructor() {}

  calculateWinrate(wins, losses): string {
    return ((wins / (wins + losses)) * 100).toPrecision(4);
  }

  segmentChanged(event) {
    const newTab = event.detail.value;
    this.changeTab.emit(newTab);
  }
}

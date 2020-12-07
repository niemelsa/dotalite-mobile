import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerData } from '../../interfaces/player-data.interface';

@Component({
  selector: 'app-player-content',
  templateUrl: './player-content.component.html',
  styleUrls: ['./player-content.component.scss'],
})
export class PlayerContentComponent implements OnInit {
  @Input() currentTab: string;
  @Input() player: PlayerData;
  @Output() changeTab = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  segmentChanged(event) {
    const tab = event.detail.value;
    this.changeTab.emit(tab);
  }
}

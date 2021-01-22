import { BehaviorSubject } from 'rxjs';
import { PlayerData } from '../../interfaces/player-data.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
})
export class PlayerInfoComponent implements OnInit {
  // private playerSubject = new BehaviorSubject<PlayerData>(null);
  // playerData: PlayerData;
  // selected = 'Overview';

  @Input() player: PlayerData;
  @Input() selected: string;

  @Output() changeTab = new EventEmitter<string>();

  // @Input()
  // set data(value) {
  //   this.playerSubject.next(value);
  // }

  constructor() {}

  ngOnInit() {
    // this.playerSubject
    //   .pipe(takeWhile(() => !this.playerData))
    //   .subscribe((player-info) => {
    //     this.playerData = player-info;
    //   });
    console.log(this.player);
  }

  calculateWinrate(wins, losses): string {
    return ((wins / (wins + losses)) * 100).toPrecision(4);
  }

  segmentChanged(event) {
    const newTab = event.detail.value;
    this.changeTab.emit(newTab);
  }
}

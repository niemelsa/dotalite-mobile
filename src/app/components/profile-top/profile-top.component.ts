import { BehaviorSubject } from 'rxjs';
import { PlayerData } from '../../interfaces/player-data.interface';
import { Component, Input, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-top.component.html',
  styleUrls: ['./profile-top.component.scss'],
})
export class ProfileTopComponent implements OnInit {
  private playerSubject = new BehaviorSubject<PlayerData>(null);
  playerData: PlayerData;
  selectedTab = 'Overview';

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

  segmentChanged(event) {
    console.log(event);
  }
}

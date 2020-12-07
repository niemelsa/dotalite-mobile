import { PlayerData } from './../../interfaces/player-data.interface';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  player: PlayerData = null;
  selectedTab: any = 'Overview';

  constructor(
    private location: Location,
    private router: Router,
    private modalCtrl: ModalController,
    private http: HttpClient
  ) {}

  @Input() userId: any;

  ngOnInit() {
    this.getPlayerData();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  getPlayerData() {
    return this.http
      .get(`http://localhost:3000/players/${this.userId}`)
      .subscribe((player: PlayerData) => {
        this.player = player;
      });
  }

  segmentChanged(event) {
    console.log(event);
  }
}

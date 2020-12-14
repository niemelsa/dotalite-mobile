import { PlayerData } from '../../interfaces/player-data.interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {
  player: PlayerData;
  selectedTab = 'Overview';

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
      .get(`https://dotalite.herokuapp.com/players/${this.userId}`)
      .subscribe((player: PlayerData) => (this.player = player));
  }

  handleTabChanged(newTab: string) {
    this.selectedTab = newTab;
  }
}

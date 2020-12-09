import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  selectedTab = 'players';
  placeholderText = 'Search for players';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  segmentChanged(event) {
    const newTab = event.detail.value;

    switch (newTab) {
      case 'players':
        this.placeholderText = 'Search by player name or ID';
        break;
      case 'teams':
        this.placeholderText = 'Search by team name or ID';
        break;
      case 'tournaments':
        this.placeholderText = 'Search by tournament name';
        break;
      case 'matches':
        this.placeholderText = 'Search by match ID';
        break;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  avatarPrefix =
    'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/';
  selectedTab = 'players';
  searchInProgress: boolean;

  constructor(
    private modalCtrl: ModalController,
    public search: SearchService
  ) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  async handleSearch(event) {
    const query = event.target.value;

    if (query) {
      await this.search.getSearchResults(query);
    }
  }

  handleInput(event) {
    if (event.target.value) {
      this.search.searchResults.next(null);
      this.searchInProgress = true;
    } else {
      this.searchInProgress = false;
      this.search.searchResults.next(null);
    }
  }
}

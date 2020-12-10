import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  selectedTab = 'Players';
  searchInProgress: boolean;
  slideOpts = {
    slidesPerView: 'auto',
    spaceBetween: '10',
  };
  slides = [
    {
      title: 'Players',
    },
    {
      title: 'Matches',
    },
    {
      title: 'Teams',
    },
    {
      title: 'Tournaments',
    },
  ];

  constructor(
    private modalCtrl: ModalController,
    public search: SearchService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.search.searchResults.next(null);
  }

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

  segmentChanged(event) {}
}

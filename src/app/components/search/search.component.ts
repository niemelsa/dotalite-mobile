import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  selectedFilter: string;
  searchInProgress: boolean;
  filters = [
    { title: 'Players', icon: 'people' },
    { title: 'Teams', icon: 'apps' },
    { title: 'Matches', icon: 'layers' },
    { title: 'Tournaments', icon: 'trophy' },
    { title: 'Pro Players', icon: 'star' },
  ];

  constructor(
    private modalCtrl: ModalController,
    public search: SearchService
  ) {}

  ngOnInit() {
    this.selectedFilter = this.filters[0].title;
  }

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

  changeFilter(event) {
    this.selectedFilter =
      event.target.textContent || event.target.parentElement.textContent;
  }
}

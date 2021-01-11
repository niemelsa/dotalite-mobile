import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  placeholderText: string;
  hasResults: boolean;
  filters = [
    { title: 'Players', icon: 'people' },
    { title: 'Teams', icon: 'apps' },
    { title: 'Matches', icon: 'layers' },
    { title: 'Tournaments', icon: 'trophy' },
    { title: 'Pro Players', icon: 'star' },
  ];

  @Input() isLinkComponent: boolean;

  constructor(
    private modalCtrl: ModalController,
    public searchService: SearchService
  ) {}

  ngOnInit() {
    this.selectedFilter = this.filters[0].title;

    this.placeholderText = this.isLinkComponent
      ? 'Type your player name'
      : 'Type to start searching';
  }

  ngOnDestroy() {
    this.searchService.searchResults.next(null);
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  async handleSearch(event) {
    const query = event.target.value;

    if (query) {
      await this.searchService.getSearchResults(query);
      this.hasResults = true;
    }
  }

  handleInput(event) {
    if (event.target.value) {
      this.searchService.searchResults.next(null);
      this.searchInProgress = true;
    } else {
      this.searchInProgress = false;
      this.searchService.searchResults.next(null);
      this.hasResults = false;
    }
  }

  changeFilter(event) {
    this.selectedFilter =
      event.target.textContent || event.target.parentElement.textContent;
  }

  getHeaderText(): string {
    if (this.isLinkComponent && this.hasResults) {
      return 'Pick your profile';
    } else {
      return 'Search';
    }
  }
}

import { PlayersProfilePage } from 'src/app/pages/players-profile/players-profile.page';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
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
    private modalController: ModalController,
    public searchService: SearchService,
    private userService: UserService,
    private router: Router,
    private auth: AuthService
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
    this.modalController.dismiss();
  }

  handleLinkEvent(playerId: number) {
    this.userService
      .linkProfile(playerId)
      .subscribe(({ message, user }: any) => {
        this.auth.updateUserValue(user);
        console.log(message);
        this.router.navigate(['tabs']).then(() => {
          this.dismiss();
        });
      });
  }

  async handleOpenProfileEvent(playerId: string | number) {
    const modal = await this.modalController.create({
      component: PlayersProfilePage,
      componentProps: {
        playerId,
      },
      cssClass: 'player-modal',
    });

    await modal.present();
  }

  handleSearch(event) {
    const query = event.target.value;

    if (query) {
      this.searchService.getSearchResults(query).subscribe((results) => {
        this.searchService.searchResults.next(results);
        console.log(results);
        this.hasResults = true;
      });
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

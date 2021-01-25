import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchResponse } from '../../interfaces/search-response.interface';
import { PlayersService } from '../../services/players.service';
import { ModalController } from '@ionic/angular';
import { PlayersProfilePage } from 'src/app/pages/players-profile/players-profile.page';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  @Input() results: SearchResponse;
  @Input() selected: string;
  @Input() isLinkComponent: boolean;
  @Output() linkEvent = new EventEmitter<any>();

  constructor(
    public playersService: PlayersService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  linkProfile(event, playerId) {
    this.linkEvent.emit(playerId);
  }

  async openProfile(id: number) {
    const modal = await this.modalController.create({
      component: PlayersProfilePage,
      componentProps: {
        playerId: id,
      },
      cssClass: 'player-modal',
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
  }
}

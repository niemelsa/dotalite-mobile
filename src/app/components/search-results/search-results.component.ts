import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchResponse } from '../../interfaces/search-response.interface';
import { PlayersService } from '../../services/players.service';
import { ModalController } from '@ionic/angular';

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
  @Output() openProfileEvent = new EventEmitter<any>();

  constructor(
    public playersService: PlayersService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  linkProfile(playerId) {
    this.linkEvent.emit(playerId);
  }

  openProfile(playerId: string | number) {
    this.openProfileEvent.emit(playerId);
  }
}

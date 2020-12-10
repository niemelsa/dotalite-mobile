import { Component, Input, OnInit } from '@angular/core';
import { SearchResponse } from '../../interfaces/search-response.interface';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  @Input() results: SearchResponse;
  @Input() selected: string;

  constructor(public playersService: PlayersService) {}

  ngOnInit() {}
}

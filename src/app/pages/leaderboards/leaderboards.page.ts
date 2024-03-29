import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.page.html',
  styleUrls: ['./leaderboards.page.scss'],
})
export class LeaderboardsPage implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}
}

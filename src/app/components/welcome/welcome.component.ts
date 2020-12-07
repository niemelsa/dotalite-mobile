import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @Input() user: User;

  constructor(
    private playersService: PlayersService,
    public authService: AuthService
  ) {}

  ngOnInit() {}
}

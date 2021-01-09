import { User } from './../../interfaces/user.interface';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PlayersService } from '../../services/players.service';
import { UserInfo } from '../../interfaces/user-info.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  @Input() user: UserInfo;

  constructor(
    public playersService: PlayersService,
    public authService: AuthService
  ) {}
}

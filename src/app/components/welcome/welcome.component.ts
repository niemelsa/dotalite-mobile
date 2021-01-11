import { SearchComponent } from './../search/search.component';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PlayersService } from '../../services/players.service';
import { UserInfo } from '../../interfaces/user-info.interface';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  @Input() user: UserInfo;

  constructor(
    public playersService: PlayersService,
    public authService: AuthService,
    public modalController: ModalController
  ) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'search-modal',
      componentProps: {
        isLinkComponent: true,
      },
    });

    return await modal.present();
  }
}

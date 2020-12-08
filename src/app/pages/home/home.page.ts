import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { SearchComponent } from '../../components/search/search.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalController: ModalController,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {}

  async toggleSearch() {
    const modal = await this.modalController.create({
      component: SearchComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
  }

  async toggleNotifications(event: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event,
      mode: 'ios',
      cssClass: 'notifications-popover',
    });

    return await popover.present();
  }
}

import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async openProfile(user) {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: {
        userId: user.id,
      },
      cssClass: 'player-modal',
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
  }
}

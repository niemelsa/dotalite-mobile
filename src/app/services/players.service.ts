import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfilePage } from '../pages/profile/profile.page';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  apiUrl = 'http://localhost:3000/user/link';

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) {}

  async openProfile(id: number) {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: {
        userId: id,
      },
      cssClass: 'player-modal',
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
  }

  linkProfile(event, id: number): void {
    event.stopPropagation();

    this.http.put(this.apiUrl, { playerId: id }).subscribe((data) => {
      console.log('doned: ', data);
    });
  }
}

import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentFavoritesToast({ title, status }) {
    const toast = await this.toastController.create({
      message: status
        ? `${title} was successfully added to favourites`
        : `${title} was successfully removed from favourites`,
      duration: 2000,
      cssClass: ['toast', `${status ? 'green' : 'red'}`],
    });

    toast.present();
  }

  async presentErrorToast({ message }) {
    const toast = await this.toastController.create({
      message: 'there was an error',
      cssClass: ['toast', 'red'],
      buttons: [
        {
          side: 'end',
          icon: 'close',
          handler: () => {
            toast.dismiss();
          },
        },
      ],
    });

    toast.present();
  }
}

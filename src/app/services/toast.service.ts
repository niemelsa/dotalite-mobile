import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentFavoritesToast({ title, isFavorited }) {
    const toast = await this.toastController.create({
      message: isFavorited
        ? `${title} was successfully removed from favourites`
        : `${title} was successfully added to favourites`,
      duration: 2000,
      cssClass: ['toast', `${isFavorited ? 'red' : 'green'}`],
    });

    await toast.present();
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

    await toast.present();
  }
}

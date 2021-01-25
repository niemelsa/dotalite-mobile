import { SearchComponent } from './../components/search/search.component';
import { ToastController, ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PresentationService {
  constructor(
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  async presentLinkSearchModal() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'search-modal',
      componentProps: {
        isLinkComponent: true,
      },
    });

    await modal.present();
  }

  async presentFavoritesToast({ title, action }) {
    const type = action === 'add';

    const toast = await this.toastController.create({
      message: type
        ? `${title} was successfully added to favourites`
        : `${title} was successfully removed from favourites`,
      duration: 2000,
      cssClass: ['toast', `${type ? 'green' : 'red'}`],
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

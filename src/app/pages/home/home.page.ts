import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchComponent } from '../../components/search/search.component';

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

  async toggleSearch() {
    // this.active = !this.active;
    // console.log('active: ', this.active);
    const modal = await this.modalController.create({
      component: SearchComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
  }
}

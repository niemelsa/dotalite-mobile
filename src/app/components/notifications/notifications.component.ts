import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent implements OnInit {
  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {}

  async dismissPopover() {
    await this.popoverCtrl.dismiss({ dismissed: true });
  }
}

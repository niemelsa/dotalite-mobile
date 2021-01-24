import { Favorite } from './../../interfaces/favorite.interface';
import { UserInfo } from './../../interfaces/user-info.interface';
import { Component, Input, OnInit } from '@angular/core';
import { ProfilePage } from 'src/app/pages/profile/profile.page';
import { ModalController } from '@ionic/angular';

enum SelectedTab {
  Featured = 'featured',
  Favorites = 'favorites',
}

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
})
export class ShortcutComponent implements OnInit {
  @Input() user: UserInfo;
  selectedTab = 'featured';

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  segmentChanged({ detail }: CustomEvent) {
    console.log(detail.value);
  }

  isSelected(tab: SelectedTab) {
    return this.selectedTab === tab;
  }
}

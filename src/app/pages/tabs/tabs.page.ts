import { Component, OnInit } from '@angular/core';
import { AppPage } from 'src/app/interfaces/app-page.interface';
import { getPages } from '../appPages';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  appPages: Array<AppPage>;

  constructor() {
  }

  ngOnInit() {
    this.appPages = getPages();
  }

}

import { Component, OnInit } from '@angular/core';
import { AppPage } from 'src/app/interfaces/app-page.interface';
import { getTabPages } from '../appPages';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  tabPages: Array<AppPage>;

  constructor() {}

  ngOnInit() {
    this.tabPages = getTabPages();
  }
}

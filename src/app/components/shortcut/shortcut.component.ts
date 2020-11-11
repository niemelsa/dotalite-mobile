import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss'],
})
export class ShortcutComponent implements OnInit {
  mockFavorites = [
    {
      title: 'soupy',
      category: 'Player',
      image: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/69/6926d43e27abb3d730544f008aa3f8dad36be0da_full.jpg',
    },
    {
      title: 'spicy',
      category: 'Player',
      image: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/56/56e36ec470740cf8548996697e5cddb624af3508_full.jpg',
    },
    {
      title: 'OG',
      category: 'Team',
      image: 'https://riki.dotabuff.com/t/l/11jt47R2Yjx.png'
    },
  ];

  selectedTab = 'featured';

  constructor() { }

  ngOnInit() { }

  segmentChanged({ detail }: CustomEvent) {
    console.log(detail.value);
  }
}

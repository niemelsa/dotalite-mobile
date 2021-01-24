import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shortcut-trending',
  templateUrl: './shortcut-trending.component.html',
  styleUrls: ['./shortcut-trending.component.scss'],
})
export class ShortcutTrendingComponent implements OnInit {
  slideOpts = {
    slidesPerView: 'auto',
  };

  mockTrending = [
    {
      title: 'The International',
      image:
        'https://www.vpesports.com/wp-content/uploads/2019/06/TI9-cover.png',
      category: 'Tournament',
    },
    {
      title: 'OG',
      image:
        'https://cdn-images.win.gg/resize/w/932/h/420/format/jpg/type/progressive/fit/cover/path/news/images/5348/f556e61ab33015b6f6b3780a0cdc8d51/thumbs/web/main-w750h335/jpg/29c9699bcc48df76e088d6962990cf39.jpg',
      category: 'Team',
    },
    {
      title: 'Arteezy',
      image:
        'https://www.monsterenergy.com/media/uploads_image/2016/11/16/1600/800/5ced8e45e488877b80c870ce266ab4c8.jpg?mod=v1_a1e366001f12bc42b9cc17e012c77811',
      category: 'Player',
    },
    {
      title: 'DotaPit 10',
      image:
        'https://s3-eu-west-1.amazonaws.com/assets.aoc.com/products/AOC_2019_DOTA_Pit_1280x720px.png?mtime=20190425110810',
      category: 'Tournament',
    },
  ];

  constructor() {}

  ngOnInit() {}

  styleCard(item) {
    return {
      'background-image': `linear-gradient(rgba(28, 25, 36, 0.1), #16161d 80%), url(${item.image})`,
      'background-size': 'cover',
      'background-position': 'center',
      width: '40vw',
      height: '200px',
    };
  }
}

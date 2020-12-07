import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TrendingComponent } from 'src/app/components/trending/trending.component';
import { ShortcutComponent } from 'src/app/components/shortcut/shortcut.component';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { SearchComponent } from '../../components/search/search.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    TrendingComponent,
    ShortcutComponent,
    WelcomeComponent,
    SearchComponent,
    NotificationsComponent,
  ],
})
export class HomePageModule {}

import { ShortcutFavoritesComponent } from './../../components/shortcut-favorites/shortcut-favorites.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ShortcutTrendingComponent } from 'src/app/components/shortcut-trending/shortcut-trending.component';
import { ShortcutComponent } from 'src/app/components/shortcut/shortcut.component';
import { WelcomeComponent } from '../../components/welcome/welcome.component';
import { SearchComponent } from '../../components/search/search.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PipesModule,
  ],
  declarations: [
    HomePage,
    ShortcutTrendingComponent,
    ShortcutComponent,
    WelcomeComponent,
    SearchComponent,
    NotificationsComponent,
    SearchResultsComponent,
    ShortcutFavoritesComponent,
  ],
})
export class HomePageModule {}

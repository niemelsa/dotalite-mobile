import { PlayersProfilePageRoutingModule } from './players-profile-routing.module';
import { PlayerToolbarComponent } from '../../components/player-toolbar/player-toolbar.component';
import { PlayerInfoComponent } from '../../components/player-info/player-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayersProfilePage } from './players-profile.page';
import { PlayerContentComponent } from '../../components/player-content/player-content.component';
import { PlayerOverviewComponent } from '../../components/player-overview/player-overview.component';
import { PlayerMatchesComponent } from '../../components/player-matches/player-matches.component';
import { PlayerHeroesComponent } from '../../components/player-heroes/player-heroes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayersProfilePageRoutingModule,
  ],
  declarations: [
    PlayersProfilePage,
    PlayerInfoComponent,
    PlayerContentComponent,
    PlayerOverviewComponent,
    PlayerMatchesComponent,
    PlayerHeroesComponent,
    PlayerToolbarComponent,
  ],
})
export class PlayersProfilePageModule {}

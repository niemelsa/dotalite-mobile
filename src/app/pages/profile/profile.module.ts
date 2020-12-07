import { PlayerInfoComponent } from '../../components/player-info/player-info.component';
import { PlayerComponent } from '../../components/player/player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { PlayerContentComponent } from '../../components/player-content/player-content.component';
import { PlayerOverviewComponent } from '../../components/player-overview/player-overview.component';
import { PlayerMatchesComponent } from '../../components/player-matches/player-matches.component';
import { PlayerHeroesComponent } from '../../components/player-heroes/player-heroes.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProfilePageRoutingModule],
  declarations: [
    ProfilePage,
    PlayerComponent,
    PlayerInfoComponent,
    PlayerContentComponent,
    PlayerOverviewComponent,
    PlayerMatchesComponent,
    PlayerHeroesComponent,
  ],
})
export class ProfilePageModule {}

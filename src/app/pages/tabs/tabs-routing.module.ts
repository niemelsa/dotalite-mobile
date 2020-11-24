import { PlayersPage } from './../players/players.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesPage } from '../heroes/heroes.page';
import { HomePage } from '../home/home.page';
import { LeaderboardsPage } from '../leaderboards/leaderboards.page';
import { MatchesPage } from '../matches/matches.page';
import { ProfilePage } from '../profile/profile.page';
import { TournamentsPage } from '../tournaments/tournaments.page';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'leaderboards',
        loadChildren: () =>
          import('../leaderboards/leaderboards.module').then(
            (m) => m.LeaderboardsPageModule
          ),
      },
      {
        path: 'players',
        loadChildren: () =>
          import('../players/players.module').then((m) => m.PlayersPageModule),
      },
      {
        path: 'matches',
        loadChildren: () =>
          import('../matches/matches.module').then((m) => m.MatchesPageModule),
      },
      {
        path: 'heroes',
        loadChildren: () =>
          import('../heroes/heroes.module').then((m) => m.HeroesPageModule),
      },
      {
        path: 'tournaments',
        loadChildren: () =>
          import('../tournaments/tournaments.module').then(
            (m) => m.TournamentsPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

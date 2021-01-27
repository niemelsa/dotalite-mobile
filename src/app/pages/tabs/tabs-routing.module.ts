import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

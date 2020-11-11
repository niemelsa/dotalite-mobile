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
        children: [
          {
            path: '',
            component: HomePage
          }
        ]
      },
      {
        path: 'leaderboards',
        children: [
          {
            path: '',
            component: LeaderboardsPage
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            component: ProfilePage
          }
        ]
      },
      {
        path: 'matches',
        children: [
          {
            path: '',
            component: MatchesPage
          }
        ]
      },
      {
        path: 'heroes',
        children: [
          {
            path: '',
            component: HeroesPage
          }
        ]
      },
      {
        path: 'tournaments',
        children: [
          {
            path: '',
            component: TournamentsPage
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }

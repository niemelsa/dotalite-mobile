import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePage } from '../profile/profile.page';

import { PlayersPage } from './players.page';

const routes: Routes = [
  {
    path: '',
    component: PlayersPage,
  },
  {
    path: ':id',
    component: ProfilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersPageRoutingModule {}

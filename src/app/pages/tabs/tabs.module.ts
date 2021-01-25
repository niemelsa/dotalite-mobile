import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../home/home.module';
import { PlayersProfilePageModule } from '../players-profile/players-profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    HomePageModule,
    PlayersProfilePageModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}

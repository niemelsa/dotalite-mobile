import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TrendingComponent } from 'src/app/components/trending/trending.component';
import { ShortcutComponent } from 'src/app/components/shortcut/shortcut.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, TrendingComponent, ShortcutComponent]
})
export class HomePageModule { }

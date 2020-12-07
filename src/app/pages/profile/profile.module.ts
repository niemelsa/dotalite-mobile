import { ProfileTopInfoComponent } from '../../components/profile-top-info/profile-top-info.component';
import { ProfileTopComponent } from '../../components/profile-top/profile-top.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProfilePageRoutingModule],
  declarations: [ProfilePage, ProfileTopComponent, ProfileTopInfoComponent],
})
export class ProfilePageModule {}

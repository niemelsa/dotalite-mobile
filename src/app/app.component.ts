import { UserService } from './services/user.service';
import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { getAppPages } from './pages/appPages';
import { AppPage } from './interfaces/app-page.interface';
import { User } from './interfaces/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appPages: Array<AppPage>;
  dark = true;
  user$: Observable<User>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu.enable(true);
      this.appPages = getAppPages();
      this.toggleTheme();
      this.user$ = this.userService.user;
    });
  }

  onToggleColorTheme(event) {
    document.body.classList.toggle('dark', !event.detail.checked);
  }

  login() {
    console.log('login pushed');

    const newUser: User = {
      name: 'keittonen',
      image: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/69/6926d43e27abb3d730544f008aa3f8dad36be0da_full.jpg',
      id: 'test'
    }

    this.userService.login(newUser);
  }

  logout() {
    this.userService.logout();
  }

  toggleTheme() {
    if (this.dark) {
      document.body.classList.toggle('dark', true);
    } else {
      document.body.classList.toggle('dark', false);
    }
  }
}

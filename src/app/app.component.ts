import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
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
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages: AppPage[];
  dark = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    public authService: AuthService,
    private router: Router
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
    });
  }

  onToggleColorTheme(event) {
    document.body.classList.toggle('dark', !event.detail.checked);
  }

  async handleLogin() {
    await this.router.navigate(['login']);
  }

  async logout() {
    await this.authService.logOut();
    await this.router.navigate(['login']);
  }

  toggleTheme() {
    if (this.dark) {
      document.body.classList.toggle('dark', true);
    } else {
      document.body.classList.toggle('dark', false);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  async googleLogin() {
    await this.auth.logInWithGoogle();
  }

  async facebookLogin() {
    await this.auth.logInWithFacebook();
  }

  async twitterLogin() {
    await this.auth.logInWithTwitter();
  }

  logout() {
    this.auth.logOutUser();
  }
}

import { Component, OnInit } from '@angular/core';
import {
  cfaSignIn,
  cfaSignOut,
  mapUserCredentialToUserInfo,
  mapUserToUserInfo,
} from 'capacitor-firebase-auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  googleLogin() {
    this.auth.logInWithGoogle();
  }

  logout() {
    this.auth.logOut();
  }
}

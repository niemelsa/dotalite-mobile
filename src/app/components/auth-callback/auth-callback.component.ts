import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss'],
})
export class AuthCallbackComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = this.extractTokenFromUrl();
    this.authService.verifyToken(token);
  }

  extractTokenFromUrl() {
    return window.location.search.split('=')[1];
  }
}

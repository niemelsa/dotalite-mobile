import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss'],
})
export class AuthCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = this.extractTokenFromUrl();
    this.authService
      .verifyToken(token)
      .subscribe({
        next: () => console.log('login success'),
        error: (error) => {
          this.authService.isAuthenticated.next(false);
          this.authService.user.next(null);
          console.log('login failed ', error);
        },
      })
      .add(() => {
        this.router.navigate(['/']);
      });
  }

  extractTokenFromUrl() {
    return window.location.search.split('=')[1];
  }
}

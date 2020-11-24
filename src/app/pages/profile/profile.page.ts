import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private location: Location, private router: Router) {}

  ngOnInit() {}

  backButton() {
    if (this.router.navigated) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}

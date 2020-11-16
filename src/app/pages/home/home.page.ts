import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user$: Observable<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user$ = this.userService.user;
  }
}

import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public userImage = 'assets/images/others/admin.jpg';
  constructor(
    private events: Events
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.events.publish('user:logout', {});
  }

}

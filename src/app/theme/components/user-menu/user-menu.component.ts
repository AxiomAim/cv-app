import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Events } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(
    public appService:AppService,
    private events: Events
    ) { }

  ngOnInit() {
  }

  logout() {
    this.events.publish('user:logout', {});
  }
}

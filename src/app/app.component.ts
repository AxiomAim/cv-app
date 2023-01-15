import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Settings, AppSettings } from './app.settings';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Events } from './core/services/events.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   
  public settings: Settings;
  constructor(
      public appSettings:AppSettings, 
      public router:Router,
      @Inject(PLATFORM_ID) private platformId: Object,
      public translate: TranslateService,
      public events: Events
    ){
    this.settings = this.appSettings.settings;
    translate.addLangs(['en','de','fr','ru','tr']);
    translate.setDefaultLang('en'); 
    translate.use('en');
    this.listenToLoginEvents();
  }

  ngAfterViewInit(){ 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {   
        setTimeout(() => {
          if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0,0);
          }
        }); 
      }            
    });    
  }

  listenToLoginEvents() {
    this.events.subscribe("user:login", (data: any) => {
      this.router.navigate(['/admin']);

      // this.user$ = this.userDataService.getOne(data.userId);
      // // window.location.reload();

      // this.userDataService.getOne(data.userId).subscribe((user) => {
      //   this.user = user;
      //     this.utilService.navigate('/pages/tabs', false);

      // });
      // this.ngOnInit();
    });

    this.events.subscribe("user:signup", (data: any) => {
      this.router.navigate(['/admin']);

      // this.user$ = this.userDataService.getOne(data.userId);
      // this.utilService.navigate('/pages/tabs', false);

      // window.location.reload();
      // this.userDataService.getOne(data.id).subscribe((user) => {
      //   this.user = user;
      //   // this.authenticationService.sendEmailVerification().then(res => {
      //   //   console.log(`Email Verfication: ${res}`);
      //   //   // if(window.origin.includes('capacitor://')) {
      //   //   //   this.notificationService.cap_registerNotofocations();
      //   //   //   this.notificationService.cap_listeners(this.user.id);
      //   //   //   this.utilService.navigate("home", false);
      //   //   // }
      //   // });
      // });
      // this.ngOnInit();
    });

    this.events.subscribe("user:logout", (data: any) => {
      this.router.navigate(['/home']);
      // this.user = null;
      // this.user$ = null;
      // this.authenticationService.logout();
      // this.utilService.navigate("login", false);
      // this.ngOnInit();
    });
  }

}

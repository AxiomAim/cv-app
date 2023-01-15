import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { DatePipe } from '@angular/common';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
// import { AgmCoreModule } from '@agm/core'; 

import { environment } from 'src/environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; 
export function HttpLoaderFactory(httpClient: HttpClient) { 
  return new TranslateHttpLoader(httpClient, environment.url +'/assets/i18n/', '.json');
}
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorI18nService } from './theme/utils/mat-paginator-i18n.service';

import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { AppInterceptor } from './theme/utils/app-interceptor';

import { AppRoutingModule } from './app-routing.module'; 
import { SharedModule } from './shared/shared.module'; 


import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component'; 
import { Toolbar1Component } from './theme/components/toolbar1/toolbar1.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';  
import { ContactsComponent } from './theme/components/contacts/contacts.component'; 
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { FooterComponent } from './theme/components/footer/footer.component'; 
import { LockScreenComponent } from './pages/lock-screen/lock-screen.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AgmCoreModule, AgmMap } from '@agm/core';

/* @angular/fire */
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireMessagingModule } from "@angular/fire/compat/messaging";
import { AngularFireFunctionsModule } from "@angular/fire/compat/functions";

import { FirestoreService } from "src/app/core/services/firestore/firestore.service";
import { StorageService } from "src/app/core/services/firestore/filestorage.service";
import { AuthenticationService } from "./core/services/firestore/firebase-authentication.service";
import { UserDataService } from './core/services/data-services/user-data.service';

import { Events } from './core/services/events.service';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    UserMenuComponent,  
    ContactsComponent, 
    Toolbar1Component,
    HorizontalMenuComponent,
    VerticalMenuComponent,
    FooterComponent,
    LockScreenComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }), 
    BrowserAnimationsModule,
    HttpClientModule, 
    NgProgressModule,
    NgProgressHttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I',
      libraries: ["places"]
    }), 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage())    
  ],
  providers: [ 
    AppSettings,
    Events,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    DatePipe,
    { provide: MatPaginatorIntl, useClass: MatPaginatorI18nService },
    ScreenTrackingService,UserTrackingService,
    AuthenticationService,
    AngularFireAuth,
    FirestoreService,
    StorageService,
    UserDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
